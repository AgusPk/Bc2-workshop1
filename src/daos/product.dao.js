const { query } = require("../repositories/main.repository");

class productDao {
  static getProduct() {
    const productsQuery = "SELECT * FROM Product";
    return query(productsQuery);
  }

  static createProduct() {
    const productsQuery =
      "INSERT INTO Cart (id,userId,estado)values(1,1,'activo')";
    return query(productsQuery);
  }
}

module.exports = productDao;
