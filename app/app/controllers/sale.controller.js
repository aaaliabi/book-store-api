const db = require("../models");
const Sale = db.sale;
const sequelize = db.sequelize;
const QueryTypes = db.Sequelize.QueryTypes;

exports.create = (req, res) => {
  const row = { saleDate: req.body.saleDate };

  Sale.create(row)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sale."
      });
    });
};

exports.findAll = (req, res) => {
  Sale.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Sale with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Sale with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Sale.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Sale was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Sale was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sale with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Sale.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} sales were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sales."
      });
    });
};

// ЛР 12 п.7: продажи не раньше :fromDate (sale_date >=)
exports.rawAfterDate = (req, res) => {
  const from = req.query.from;
  if (!from || String(from).trim() === "") {
    return res.status(400).send({
      message: "Query parameter from is required (ISO date string)."
    });
  }

  sequelize
    .query("SELECT * FROM sales WHERE sale_date >= :fromDate", {
      replacements: { fromDate: from },
      type: QueryTypes.SELECT,
      model: db.sale,
      mapToModel: true
    })
    .then((rows) => res.send(rows))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error executing raw query."
      });
    });
};