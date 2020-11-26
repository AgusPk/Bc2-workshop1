const productDao = require("../daos/product.dao");

class productService {
  static async getProduct(category) {
    return productDao.get(category);
  }

  static async showProduct(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        notFound: true,
        error: "product_not_found",
        msg: "Producto no encontrada",
      };
    return productDao.show(id);
  }

  static async deleteProduct(id) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        notFound: true,
        error: "product_not_found",
        msg: "Producto no encontrada",
      };
    return productDao.delete(id);
  }

  static async createProduct(categoria, nombre, cantidad, descripcion) {
    const product = [categoria, nombre, cantidad, descripcion];
    return productDao.create(product);
  }

  static async updateProduct(id, categoria, nombre, cantidad, descripcion) {
    const exists = await productDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        notFound: true,
        error: "product_not_found",
        msg: "Producto no encontrada",
      };
    return productDao.update(id, categoria, nombre, cantidad, descripcion);
  }
}

module.exports = productService;
