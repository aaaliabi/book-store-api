const db = require("../models");
const PriceListItem = db.price_list_item;
const sequelize = db.sequelize;
const QueryTypes = db.Sequelize.QueryTypes;

exports.create = (req, res) => {
  if (req.body.price === undefined || req.body.price === null) {
    res.status(400).send({
      message: "Price должен быть указан!"
    });
    return;
  }

  const row = { price: req.body.price };

  if (Object.prototype.hasOwnProperty.call(req.body, "priceListId")) {
    row.priceListId = req.body.priceListId;
  }
  if (Object.prototype.hasOwnProperty.call(req.body, "bookId")) {
    row.bookId = req.body.bookId;
  }

  PriceListItem.create(row)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PriceListItem."
      });
    });
};

exports.findAll = (req, res) => {
  PriceListItem.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving price list items."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PriceListItem.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PriceListItem with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PriceListItem with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PriceListItem.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "PriceListItem was updated successfully." });
      } else {
        res.send({
          message: `Cannot update PriceListItem with id=${id}. Maybe PriceListItem was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PriceListItem with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PriceListItem.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "PriceListItem was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete PriceListItem with id=${id}. Maybe PriceListItem was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PriceListItem with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  PriceListItem.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({
        message: `${nums} price list items were deleted successfully!`
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all price list items."
      });
    });
};

// ЛР 12 п.7: строки прайса по price_list_id
exports.rawByPriceList = (req, res) => {
  const priceListId = req.params.priceListId;

  sequelize
    .query(
      "SELECT * FROM price_list_items WHERE price_list_id = :priceListId",
      {
        replacements: { priceListId },
        type: QueryTypes.SELECT,
        model: db.price_list_item,
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