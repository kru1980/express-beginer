const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

const suggestions = [
  { id: "1", title: "Знакомство с сср", voters: new Set() },
  { id: "2", title: "Знакомство с кралей", voters: new Set() }
];

const server = express();

server.set("view engine", "pug");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static("public"));

server.use((req, res, next) => {
  const username = req.cookies.username;
  req.username = username; // больше функции не знают, что юзернайм приходит из куков
  res.locals.username = username; // locals метод объявляет локальные переменнные
  next();
});

server.get("/", (req, res) => {
  res.render("index");
});

server.post("/", (req, res) => {
  // устанавливаем куки принимают ключ-значение
  res.cookie("username", req.body.username);
  //   res.setHeader("Set-Cookie", ["username=kru1980"]);
  res.redirect("/");
});

server.get("/suggestions", (req, res) => {
  res.render("suggestions", {
    suggestions
  });
});

server.get("/suggestions/:id", (req, res) => {
  const suggestion = suggestions.find(item => item.id == req.params.id);

  res.render("suggestion", { suggestion });
});
server.post("/suggestions", (req, res) => {
  const title = req.body.title;

  suggestions.push({
    id: uuidv1(),
    title,
    voters: new Set()
  });
  res.redirect("/suggestions");
});

server.post("/suggestions/:id", (req, res) => {
  const username = req.username;
  const suggestion = suggestions.find(item => item.id == req.params.id);

  if (suggestion.voters.has(username)) {
    suggestion.voters.delete(username);
  } else {
    suggestion.voters.add(username);
  }
  // редирект на страницу откуда пришел запрос back
  res.redirect(`back`);
});

server.listen(config.PORT, () =>
  console.log(`Сервер запущен на порту ${config.PORT}`)
);
