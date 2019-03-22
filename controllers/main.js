// пишем набор ф-ций

function showMain(req, res) {
  res.render("index");
}

function login(req, res) {
  const username = req.body.username;
  req.session.username = username;
  res.redirect("/");
}

module.exports = {
  showMain,
  login
};
