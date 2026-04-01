module.exports = (app) => {
  const priceList = require("../controllers/price-list.controller.js");
  const router = require("express").Router();

  router.post("/", priceList.create);
  router.get("/", priceList.findAll);

  router.get("/raw/search", priceList.rawSearchByName);

  router.get("/:id", priceList.findOne);
  router.put("/:id", priceList.update);
  router.delete("/:id", priceList.delete);
  router.delete("/", priceList.deleteAll);

  app.use("/api/price-lists", router);
};