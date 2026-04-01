const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Book Store API работает" });
});

// подключение Sequelize
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed: " + err.message);
  });

// порт через env
const PORT = process.env.NODE_DOCKER_PORT || 8080;

require("./app/routes/category.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/price-list.routes")(app);
require("./app/routes/price-list-item.routes")(app);
require("./app/routes/sale.routes")(app);
require("./app/routes/sale-item.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});