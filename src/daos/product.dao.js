const { query } = require("../repositories/main.repository");

class productDao {
  static getProduct() {
    const productsQuery = "SELECT * FROM Product";
    return query(productsQuery);
  }
}

module.exports = productDao;
