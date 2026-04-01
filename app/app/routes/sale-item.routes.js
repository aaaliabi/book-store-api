/**
 * @swagger
 * tags:
 *   - name: SaleItems
 *     description: Строки продаж
 */

/**
 * @swagger
 * /api/sale-items:
 *   post:
 *     tags: [SaleItems]
 *     summary: Создать строку продажи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity: { type: integer, example: 2 }
 *               saleId: { type: integer, example: 1 }
 *               bookId: { type: integer, example: 3 }
 *     responses:
 *       "200":
 *         description: OK
 *   get:
 *     tags: [SaleItems]
 *     summary: Получить список строк продаж
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [SaleItems]
 *     summary: Удалить все строки продаж
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/sale-items/raw/by-sale/{saleId}:
 *   get:
 *     tags: [SaleItems]
 *     summary: Строки продажи по saleId (raw)
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/sale-items/{id}:
 *   get:
 *     tags: [SaleItems]
 *     summary: Получить строку продажи по id
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
 *     tags: [SaleItems]
 *     summary: Обновить строку продажи
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
 *               quantity: { type: integer, example: 4 }
 *               saleId: { type: integer, example: 2 }
 *               bookId: { type: integer, example: 5 }
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [SaleItems]
 *     summary: Удалить строку продажи
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
  const saleItem = require("../controllers/sale-item.controller.js");
  const router = require("express").Router();

  router.post("/", saleItem.create);
  router.get("/", saleItem.findAll);

  router.get("/raw/by-sale/:saleId", saleItem.rawBySale);

  router.get("/:id", saleItem.findOne);
  router.put("/:id", saleItem.update);
  router.delete("/:id", saleItem.delete);
  router.delete("/", saleItem.deleteAll);

  app.use("/api/sale-items", router);
};
