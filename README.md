# Book Store API

REST API для книжного магазина на Node.js, Express и Sequelize с базой PostgreSQL. Проект реализует CRUD для книг, категорий, прайс-листов и продаж, а также несколько raw-запросов. Документация доступна через Swagger UI. Проект предполагает определение Бд из 6 таблиц.

<img width="662" height="573" alt="image" src="https://github.com/user-attachments/assets/a85b36d7-1017-4b4a-beb2-173b04da0877" />


## Установка

### Вариант 1: Docker Compose

1. Установите Docker.
2. В корне проекта выполните:

```bash
docker compose up --build
```

### Вариант 2: Локально

1. Установите Node.js и PostgreSQL.
2. Перейдите в папку `app` и установите зависимости:

```bash
npm install
```

3. Создайте файл окружения по примеру `app/.env.sample` и укажите параметры подключения к PostgreSQL.
4. Запустите сервер:

```bash
node server.js
```

## Использование

Локальный запуск:
- `http://localhost:8080`

Запуск через Docker Compose:
- `http://localhost:6868`

Swagger UI:
- `http://localhost:8080/api-docs`
- `http://localhost:6868/api-docs`

Пример запроса (создание категории):

```http
POST /api/categories
Content-Type: application/json

{
  "name": "Классика",
  "description": "Классическая литература",
  "parentCategoryId": null
}
```

## Документация

Swagger/OpenAPI описания находятся в:
- `app/routes/*.js`

## Лицензия

ISC (см. `app/package.json`).

## Контактная информация

Автор: Алина Абильтарова



