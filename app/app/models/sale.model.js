module.exports = (sequelize, Sequelize) => {
  const Sale = sequelize.define("sale", {
    saleDate: {
      type: Sequelize.DATE
    }
  });

  return Sale;
};