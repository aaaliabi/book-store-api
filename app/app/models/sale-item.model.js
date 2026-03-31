module.exports = (sequelize, Sequelize) => {
  const SaleItem = sequelize.define("sale_item", {
    quantity: {
      type: Sequelize.INTEGER
    }
  });

  return SaleItem;
};