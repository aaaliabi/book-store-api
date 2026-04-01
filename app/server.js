const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Book Store API работает" });
});

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed: " + err.message);
  });

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Store API",
      version: "1.0.0",
      description: "REST API книжного магазина (ЛР 13, Swagger / OpenAPI)"
    },
    servers: [
      { url: "http://localhost:6868", description: "Хост (Docker compose, пример)" },
      { url: "http://localhost:8080", description: "" }
    ]
  },
  apis: ["./app/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("./app/routes/category.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/price-list.routes")(app);
require("./app/routes/price-list-item.routes")(app);
require("./app/routes/sale.routes")(app);
require("./app/routes/sale-item.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});