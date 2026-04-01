module.exports = app => {
  const book = require("../controllers/book.controller.js");
  const router = require("express").Router();

  router.post("/", book.create);
  router.get("/", book.findAll);
  router.get("/:id", book.findOne);
  router.put("/:id", book.update);
  router.delete("/:id", book.delete);
  router.delete("/", book.deleteAll);

  app.use("/api/books", router);
};