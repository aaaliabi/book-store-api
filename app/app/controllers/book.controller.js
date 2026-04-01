const db = require("../models");
const Book = db.book;
const sequelize = db.sequelize;
const QueryTypes = db.Sequelize.QueryTypes;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Title не может быть пустым!"
    });
    return;
  }

  const row = {
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    inStock: req.body.inStock
  };

  if (Object.prototype.hasOwnProperty.call(req.body, "categoryId")) {
    row.categoryId = req.body.categoryId;
  }

  Book.create(row)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    });
};

exports.findAll = (req, res) => {
  Book.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Book with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Book was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Book was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Book.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} books were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};

// ЛР 12: название категории по id книги
exports.getCategoryName = (req, res) => {
  const id = req.params.id;

  sequelize
    .query(
      `SELECT c.name AS name FROM categories c
       LEFT JOIN books b ON c.id = b.category_id
       WHERE b.id = ${id}`,
      { type: QueryTypes.SELECT }
    )
    .then((rows) => {
      if (!rows || rows.length === 0) {
        return res.status(404).send({
          message: `No category found for book id=${id}.`
        });
      }
      res.send(rows[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};

exports.getCategory = (req, res) => {
  const id = req.params.id;

  sequelize
    .query(
      "SELECT c.* FROM categories c LEFT JOIN books b ON c.id = b.category_id WHERE b.id = :bookId",
      {
        replacements: { bookId: id },
        type: QueryTypes.SELECT,
        model: db.category,
        mapToModel: true
      }
    )
    .then((rows) => {
      if (!rows || rows.length === 0) {
        return res.status(404).send({
          message: `No category found for book id=${id}.`
        });
      }
      res.send(rows[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};

// ЛР 12 п.7: raw + replacements + mapToModel (книги в наличии / не в наличии)
exports.rawInStock = (req, res) => {
  const v = req.query.inStock;
  if (v === undefined || v === null || v === "") {
    return res.status(400).send({
      message: "Query parameter inStock is required (true or false)."
    });
  }
  const flag = v === true || v === "true" || v === "1";

  sequelize
    .query("SELECT * FROM books WHERE in_stock = :flag", {
      replacements: { flag },
      type: QueryTypes.SELECT,
      model: db.book,
      mapToModel: true
    })
    .then((rows) => res.send(rows))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};

// ЛР 12 п.7: книги по category_id
exports.rawByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  sequelize
    .query("SELECT * FROM books WHERE category_id = :categoryId", {
      replacements: { categoryId },
      type: QueryTypes.SELECT,
      model: db.book,
      mapToModel: true
    })
    .then((rows) => res.send(rows))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};