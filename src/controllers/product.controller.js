const productService = require("../services/product.service");

class productController {
  static async getProduct(req, res) {
    try {
      const { category } = req.query;
      const products = await productService.getProduct();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async showProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productService.showProduct(id);
      return res.status(200).send(product);
    } catch (error) {
      let status = error.notFound ? 404 : 500;
      return res.status(status).send(error);
    }
  }

  static async createProduct(req, res) {
    const { categoria, nombre, cantidad, descripcion } = req.body;
    try {
      const product = await productService.createProduct(
        categoria,
        nombre,
        cantidad,
        descripcion
      );
      return res.status(200).send(product);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async updateProduct(req, res) {
    const { categoria, nombre, cantidad, descripcion } = req.body;
    const { id } = req.params;
    try {
      const product = await productService.createProduct(
        id,
        categoria,
        nombre,
        cantidad,
        descripcion
      );
      return res.status(200).send(product);
    } catch (error) {
      let status = error.notFound ? 404 : 500;
      return res.status(status).send(error);
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await productService.deleteProduct(id);
      return res.status(200).send();
    } catch (error) {
      let status = error.notFound ? 404 : 500;
      return res.status(status).send(error);
    }
  }
}

module.exports = productController;
