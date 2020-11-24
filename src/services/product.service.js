const productDao = require("../daos/product.dao");

class productService {
  static async getProduct() {
    const result = await productDao.getProduct();
    return result;
  }
}

module.exports = productService;
