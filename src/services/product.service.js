const productDao = require("../daos/product.dao");

class productService {
  static async getProduct() {
    const result = await productDao.get();
    return result;
  }

  static async showProduct(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        notFound: true,
        error: "product_not_found",
        msg: "Producto no encontrada",
      };
    const result = await productDao.show();
    return result;
  }

  static async deleteProduct(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        notFound: true,
        error: "product_not_found",
        msg: "Producto no encontrada",
      };
    const result = await productDao.delete();
    return result;
  }

  static async createProduct() {
    const result = await productDao.create();
    return result;
  }
}

module.exports = productService;
