/**
 * @swagger
 * tags:
 *   - name: Sales
 *     description: Продажи
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     tags: [Sales]
 *     summary: Создать продажу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleDate: { type: string, format: date-time, example: "2026-04-01T10:30:00.000Z" }
 *     responses:
 *       "200":
 *         description: OK
 *   get:
 *     tags: [Sales]
 *     summary: Получить список продаж
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [Sales]
 *     summary: Удалить все продажи
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/sales/raw/after:
 *   get:
 *     tags: [Sales]
 *     summary: Продажи не раньше даты from (raw)
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema: { type: string, format: date }
 *         description: Дата в формате ISO (YYYY-MM-DD)
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     tags: [Sales]
 *     summary: Получить продажу по id
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
 *     tags: [Sales]
 *     summary: Обновить продажу
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
 *               saleDate: { type: string, format: date-time, example: "2026-04-01T10:30:00.000Z" }
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [Sales]
 *     summary: Удалить продажу
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
  const sale = require("../controllers/sale.controller.js");
  const router = require("express").Router();

  router.post("/", sale.create);
  router.get("/", sale.findAll);

  router.get("/raw/after", sale.rawAfterDate);

  router.get("/:id", sale.findOne);
  router.put("/:id", sale.update);
  router.delete("/:id", sale.delete);
  router.delete("/", sale.deleteAll);

  app.use("/api/sales", router);
};
