/**
 * @swagger
 * tags:
 *   - name: PriceLists
 *     description: Прайс-листы
 */

/**
 * @swagger
 * /api/price-lists:
 *   post:
 *     tags: [PriceLists]
 *     summary: Создать прайс-лист
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Прайс апрель" }
 *               date: { type: string, format: date-time, example: "2026-04-01T00:00:00.000Z" }
 *     responses:
 *       "200":
 *         description: Прайс-лист создан
 *   get:
 *     tags: [PriceLists]
 *     summary: Получить список прайс-листов
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [PriceLists]
 *     summary: Удалить все прайс-листы
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/price-lists/raw/search:
 *   get:
 *     tags: [PriceLists]
 *     summary: Поиск прайс-листов по имени (ILIKE)
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: Подстрока для поиска
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/price-lists/{id}:
 *   get:
 *     tags: [PriceLists]
 *     summary: Получить прайс-лист по идентификатору
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Не найдено
 *   put:
 *     tags: [PriceLists]
 *     summary: Обновить прайс-лист
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Новый прайс" }
 *               date: { type: string, format: date-time, example: "2026-04-01T00:00:00.000Z" }
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [PriceLists]
 *     summary: Удалить прайс-лист
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       "200":
 *         description: OK
 */

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
