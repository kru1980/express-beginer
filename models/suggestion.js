// Здесь храним модель и функции работы с моделью
const uuidv1 = require("uuid/v1");

const suggestions = [
  { id: "1", title: "Знакомство с сср", voters: new Set() },
  { id: "2", title: "Знакомство с кралей", voters: new Set() }
];

function add(title) {
  suggestions.push({
    id: uuidv1(),
    title,
    voters: new Set()
  });
}
function getAll() {
  return suggestions;
}
function getOne(id) {
  return suggestions.find(item => item.id == id);
}

module.exports = {
  getAll,
  getOne,
  add
};
