module.exports = app => {
  const sale = require("../controllers/sale.controller.js");
  const router = require("express").Router();

  router.post("/", sale.create);
  router.get("/", sale.findAll);
  router.get("/:id", sale.findOne);
  router.put("/:id", sale.update);
  router.delete("/:id", sale.delete);
  router.delete("/", sale.deleteAll);

  app.use("/api/sales", router);
};