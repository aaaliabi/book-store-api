module.exports = app => {
  const saleItem = require("../controllers/sale-item.controller.js");
  const router = require("express").Router();

  router.post("/", saleItem.create);
  router.get("/", saleItem.findAll);
  router.get("/:id", saleItem.findOne);
  router.put("/:id", saleItem.update);
  router.delete("/:id", saleItem.delete);
  router.delete("/", saleItem.deleteAll);

  app.use("/api/sale-items", router);
};