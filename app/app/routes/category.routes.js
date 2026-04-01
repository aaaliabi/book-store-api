/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Категории
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Создать категорию
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Классика" }
 *               description: { type: string, example: "Классическая литература" }
 *               parentCategoryId: { type: integer, example: 1 }
 *     responses:
 *       "200":
 *         description: Категория создана
 *   get:
 *     tags: [Categories]
 *     summary: Получить список всех категорий
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [Categories]
 *     summary: Удалить все категории
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/categories/raw/roots:
 *   get:
 *     tags: [Categories]
 *     summary: Корневые категории (parent_category_id IS NULL)
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/categories/raw/children/{parentId}:
 *   get:
 *     tags: [Categories]
 *     summary: Подкатегории по parentId
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Получить категорию по идентификатору
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
 *     tags: [Categories]
 *     summary: Обновить категорию
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
 *               name: { type: string, example: "Новая категория" }
 *               description: { type: string, example: "Описание" }
 *               parentCategoryId: { type: integer, example: 2 }
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     tags: [Categories]
 *     summary: Удалить категорию
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
