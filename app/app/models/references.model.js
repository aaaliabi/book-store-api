module.exports = (db) => {

  // 📚 Category → Books
  db.category.hasMany(db.book, {
    foreignKey: "categoryId"
  });

  db.book.belongsTo(db.category, {
    foreignKey: "categoryId"
  });

  // 📄 PriceList → PriceListItem
  db.price_list.hasMany(db.price_list_item, {
    foreignKey: "priceListId"
  });

  db.price_list_item.belongsTo(db.price_list, {
    foreignKey: "priceListId"
  });

  // 📚 Book → PriceListItem
  db.book.hasMany(db.price_list_item, {
    foreignKey: "bookId"
  });

  db.price_list_item.belongsTo(db.book, {
    foreignKey: "bookId"
  });

  // 🧾 Sale → SaleItem
  db.sale.hasMany(db.sale_item, {
    foreignKey: "saleId"
  });

  db.sale_item.belongsTo(db.sale, {
    foreignKey: "saleId"
  });

  // 📚 Book → SaleItem
  db.book.hasMany(db.sale_item, {
    foreignKey: "bookId"
  });

  db.sale_item.belongsTo(db.book, {
    foreignKey: "bookId"
  });

};