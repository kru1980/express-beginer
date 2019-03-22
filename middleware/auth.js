module.exports = function auth(req, res, next) {
  const username = req.session.username;
  req.username = username; // больше функции не знают, что юзернайм приходит из куков
  res.locals.username = username; // locals метод объявляет локальные переменнные НЕ ПОНЯТНО ГДЕ
  next();
};
