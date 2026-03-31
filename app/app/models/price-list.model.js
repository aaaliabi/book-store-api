module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("price_list", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    }
  });

  return PriceList;
};