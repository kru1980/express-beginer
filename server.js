const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const bodyParser = require("body-parser");

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
  // показать список предложений
  throw new Error("НЕ создано");
});

server.get("/suggestions:id", (req, res) => {
  // показать одно предложение
  throw new Error("НЕ создано");
});
server.post("/suggestions", (req, res) => {
  // создать предложение
  // перенаправить на список
  throw new Error("НЕ создано");
});
server.post("/suggestions:id", (req, res) => {
  // проголосовать за предложение и перенаправить на предложение

  throw new Error("НЕ создано");
});

server.listen(config.PORT, () =>
  console.log(`Сервер запущен на порту ${config.PORT}`)
);
