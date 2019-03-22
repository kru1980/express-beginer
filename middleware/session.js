const sessions = {};
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

module.exports = function session(req, res, next) {
  // делаем здесь сессию
  // если в куки нет id сессии создадим ее, если есть  то получим ее из внутреннего хранилища
  //проверка если в куках есть сессия и лна есть в хранилище

  if (req.cookies.sessionId && sessions[req.cookies.sessionId]) {
    req.session = sessions[req.cookies.sessionId];
  } else {
    const sessionId = crypto.randomBytes(8).toString("hex");
    const session = {
      id: sessionId
    };
    //console.log("создание sessionId", sessionId);
    sessions[sessionId] = session;
    //console.log(sessions); // создалась новая сессия тк ее не было
    res.cookie("sessionId", sessionId); // отдаем в куках ид новой сесии
    req.session = session; // в ответ, который приходит с клиента задаем новую сессию
    //console.log("отправка на клиент session", res.session); // отправленная на клиент сесия
  }
  //console.log("смотрим на session с которой работаем", req.session); // отправленная на клиент сесия
  next();
};
