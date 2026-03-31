const db = require("../models");
const Category = db.category; // используем category как таблицу

exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({
      message: "Name не может быть пустым!"
    });
    return;
  }

  const category = {
    name: req.body.name,
    description: req.body.description
  };

  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};