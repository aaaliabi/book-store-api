const db = require("../models");
const SaleItem = db.sale_item;

exports.create = (req, res) => {
  if (req.body.quantity === undefined || req.body.quantity === null) {
    res.status(400).send({
      message: "Quantity должен быть указан!"
    });
    return;
  }

  const row = { quantity: req.body.quantity };

  if (Object.prototype.hasOwnProperty.call(req.body, "saleId")) {
    row.saleId = req.body.saleId;
  }
  if (Object.prototype.hasOwnProperty.call(req.body, "bookId")) {
    row.bookId = req.body.bookId;
  }

  SaleItem.create(row)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SaleItem."
      });
    });
};

exports.findAll = (req, res) => {
  SaleItem.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sale items."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  SaleItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SaleItem with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SaleItem with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  SaleItem.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "SaleItem was updated successfully." });
      } else {
        res.send({
          message: `Cannot update SaleItem with id=${id}. Maybe SaleItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SaleItem with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  SaleItem.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "SaleItem was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete SaleItem with id=${id}. Maybe SaleItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SaleItem with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  SaleItem.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} sale items were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sale items."
      });
    });
};