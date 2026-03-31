module.exports = app => {

  // подключаем контроллер
  const category = require("../controllers/category.controller.js");

  const router = require("express").Router();

  // маршрут создания
  router.post("/", category.create);

  // базовый путь
  app.use('/api/categories', router);
};