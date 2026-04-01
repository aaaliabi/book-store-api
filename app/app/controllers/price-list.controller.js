const db = require("../models");
const PriceList = db.price_list;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name не может быть пустым!"
    });
    return;
  }

  const row = {
    name: req.body.name,
    date: req.body.date
  };

  PriceList.create(row)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PriceList."
      });
    });
};

exports.findAll = (req, res) => {
  PriceList.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving price lists."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PriceList.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PriceList with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PriceList with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PriceList.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "PriceList was updated successfully." });
      } else {
        res.send({
          message: `Cannot update PriceList with id=${id}. Maybe PriceList was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PriceList with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PriceList.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "PriceList was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete PriceList with id=${id}. Maybe PriceList was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PriceList with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  PriceList.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({
        message: `${nums} price lists were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all price lists."
      });
    });
};