module.exports = (app) => {
  const item = require("../controllers/price-list-item.controller.js");
  const router = require("express").Router();

  router.post("/", item.create);
  router.get("/", item.findAll);

  router.get("/raw/by-price-list/:priceListId", item.rawByPriceList);

  router.get("/:id", item.findOne);
  router.put("/:id", item.update);
  router.delete("/:id", item.delete);
  router.delete("/", item.deleteAll);

  app.use("/api/price-list-items", router);
};