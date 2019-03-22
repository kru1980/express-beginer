module.exports = function flash(req, res, next) {
  if (req.session && req.session.message) {
    // сохранили свойство  message в локальной переменной
    res.locals.message = req.session.message;
    // удаляем свойство message из объекта сессии
    delete req.session.message;
  }
  next();
};
