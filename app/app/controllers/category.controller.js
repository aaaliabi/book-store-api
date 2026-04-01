const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const QueryTypes = db.Sequelize.QueryTypes;

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

  if (Object.prototype.hasOwnProperty.call(req.body, "parentCategoryId")) {
    category.parentCategoryId = req.body.parentCategoryId;
  }

  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ message: `${nums} Category were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all category."
      });
    });
};

// ЛР 12 п.7: корневые категории
exports.rawRoots = (req, res) => {
  sequelize
    .query(
      "SELECT * FROM categories WHERE parent_category_id IS NULL",
      {
        type: QueryTypes.SELECT,
        model: db.category,
        mapToModel: true
      }
    )
    .then((rows) => res.send(rows))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};

// ЛР 12 п.7: подкатегории
exports.rawChildren = (req, res) => {
  const parentId = req.params.parentId;

  sequelize
    .query(
      "SELECT * FROM categories WHERE parent_category_id = :parentId",
      {
        replacements: { parentId },
        type: QueryTypes.SELECT,
        model: db.category,
        mapToModel: true
      }
    )
    .then((rows) => res.send(rows))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};