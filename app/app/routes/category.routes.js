module.exports = (app) => {
  const category = require("../controllers/category.controller.js");
  const router = require("express").Router();

  router.post("/", category.create);

  router.get("/", category.findAll);

  router.get("/raw/roots", category.rawRoots);
  router.get("/raw/children/:parentId", category.rawChildren);

  router.get("/:id", category.findOne);

  router.put("/:id", category.update);

  router.delete("/:id", category.delete);

  router.delete("/", category.deleteAll);

  app.use("/api/categories", router);
};