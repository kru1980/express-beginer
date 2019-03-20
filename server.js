const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

const suggestions = [
  { id: "1", title: "Знакомство с сср" },
  { id: "2", title: "Знакомство с кралей" }
];

const server = express();

server.set("view engine", "pug");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static("public"));

server.get("/", (req, res) => {
  console.log(req.cookies.username);
  const username = req.cookies.username;

  res.render("index", {
    username
  });
  //   res.sendFile("./index.html", { root: __dirname });
});

server.post("/", (req, res) => {
  console.log(req.body.username);
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
  console.log("slug", req.params.id);
  const suggestion = suggestions.find(item => item.id == req.params.id);
  res.render("suggestion", { suggestion });
});
server.post("/suggestions", (req, res) => {
  // создать предложение
  const title = req.body.title;

  suggestions.push({
    id: uuidv1(),
    title
  });
  res.redirect("/suggestions");
});
server.post("/suggestions:id", (req, res) => {
  // проголосовать за предложение и перенаправить на предложение
});

server.listen(config.PORT, () =>
  console.log(`Сервер запущен на порту ${config.PORT}`)
);
