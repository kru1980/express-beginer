const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const session = require("./middleware/session");
const flash = require("./middleware/flash");
const auth = require("./middleware/auth");
const user = require("./middleware/user");

const mainController = require("./controllers/main");
const suggestionController = require("./controllers/suggestion");

const server = express();

server.set("view engine", "pug");

server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(session);
server.use(flash);
server.use(auth);

server.get("/", mainController.showMain);
server.post("/", mainController.login);
// ограничиваем вход на страницы. Должна быть строго ниже / маршрута
server.use(user);

server.get("/suggestions", suggestionController.showSuggestions);
server.post("/suggestions", suggestionController.createSuggestions);
server.get("/suggestions/:id", suggestionController.showSuggestion);
server.post("/suggestions/:id", suggestionController.toggleVotes);

server.listen(config.PORT, () =>
  console.log(`Сервер запущен на порту ${config.PORT}`)
);
