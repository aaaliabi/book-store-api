/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Книги (book store)
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     summary: Создать книгу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Война и мир" }
 *               author: { type: string, example: "Л. Толстой" }
 *               price: { type: number, example: 799 }
 *               inStock: { type: boolean, example: true }
 *               categoryId: { type: integer, example: 1 }
 *     responses:
 *       "200":
 *         description: Книга создана
 *   get:
 *     tags: [Books]
 *     summary: Получить список всех книг
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/books/page:
 *   get:
 *     tags: [Books]
 *     summary: Постраничный список книг (pager)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Номер страницы
 *       - in: query
 *         name: size
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *         description: Размер страницы
 *     responses:
 *       "200":
 *         description: Страница данных
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Получить книгу по идентификатору
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
 */

module.exports = (app) => {
  const book = require("../controllers/book.controller.js");
  const router = require("express").Router();

  router.post("/", book.create);
  router.get("/", book.findAll);

  router.get("/page", book.findAllPaged);

  router.get("/raw/in-stock", book.rawInStock);
  router.get("/raw/by-category/:categoryId", book.rawByCategory);

  router.get("/:id/categoryname", book.getCategoryName);
  router.get("/:id/category", book.getCategory);

  router.get("/:id", book.findOne);
  router.put("/:id", book.update);
  router.delete("/:id", book.delete);
  router.delete("/", book.deleteAll);

  app.use("/api/books", router);
};