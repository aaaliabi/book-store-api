module.exports = (sequelize, Sequelize) => {
  const PriceListItem = sequelize.define("price_list_item", {
    price: {
      type: Sequelize.FLOAT
    }
  });

  return PriceListItem;
};