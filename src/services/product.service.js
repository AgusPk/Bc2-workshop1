const productDao = require("../daos/product.dao");

class productService {
  static async getProduct() {
    const result = await productDao.getProduct();
    return result;
  }

  static async createProduct() {
    const result = await productDao.createProduct();
    return result;
  }
}

module.exports = productService;
