module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    inStock: {
      type: Sequelize.BOOLEAN
    }
  });

  return Book;
};