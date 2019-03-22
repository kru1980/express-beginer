// пишем набор ф-ций

const model = require("../models/suggestion");

function showSuggestions(req, res) {
  res.render("suggestions", {
    suggestions: model.getAll()
  });
}

function showSuggestion(req, res) {
  const suggestion = model.getOne(req.params.id);

  res.render("suggestion", { suggestion });
}

function createSuggestions(req, res) {
  const title = req.body.title;

  model.add(title);

  req.session.message = " Предложение принято"; // передадим его в шаблон
  res.redirect("/suggestions");
}

function toggleVotes(req, res) {
  const username = req.username;
  const suggestion = model.getOne(req.params.id);

  if (suggestion.voters.has(username)) {
    suggestion.voters.delete(username);
    req.session.message = " Голос отменен";
  } else {
    suggestion.voters.add(username);
    req.session.message = " Голос принят";
  }
  // редирект на страницу откуда пришел запрос back
  res.redirect(`back`);
}

module.exports = {
  showSuggestions,
  showSuggestion,
  createSuggestions,
  toggleVotes
};
