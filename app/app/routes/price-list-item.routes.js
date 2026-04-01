/**
 * @swagger
 * tags:
 *   - name: PriceListItems
 *     description: Строки прайс-листа
 */

/**
 * @swagger
 * /api/price-list-items:
 *   post:
 *     tags: [PriceListItems]
 *     summary: Создать строку прайс-листа
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [price]
 *             properties:
 *               price: { type: number, example: 499 }
 *               priceListId: { type: integer, example: 1 }
 *               bookId: { type: integer, example: 3 }
 *     responses:
 *       "200":
 *         description: OK
 *   get:
 *     tags: [PriceListItems]
 *     summary: Получить список строк прайс-листа
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [PriceListItems]
 *     summary: Удалить все строки прайс-листа
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/price-list-items/raw/by-price-list/{priceListId}:
 *   get:
 *     tags: [PriceListItems]
 *     summary: Строки прайса по priceListId (raw)
 *     parameters:
 *       - in: path
 *         name: priceListId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/price-list-items/{id}:
 *   get:
 *     tags: [PriceListItems]
 *     summary: Получить строку прайс-листа по id
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
 *     tags: [PriceListItems]
 *     summary: Обновить строку прайс-листа
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
 *               price: { type: number, example: 599 }
 *               priceListId: { type: integer, example: 1 }
 *               bookId: { type: integer, example: 5 }
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [PriceListItems]
 *     summary: Удалить строку прайс-листа
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
