const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: dbConfig.pool
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book = require("./book.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.price_list = require("./price-list.model.js")(sequelize, Sequelize);
db.price_list_item = require("./price-list-item.model.js")(sequelize, Sequelize);
db.sale = require("./sale.model.js")(sequelize, Sequelize);
db.sale_item = require("./sale-item.model.js")(sequelize, Sequelize);

require("./references.model.js")(db);


module.exports = db;