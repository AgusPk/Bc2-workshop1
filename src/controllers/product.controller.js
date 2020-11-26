const productService = require("../services/product.service");

class productController {
  static async getProduct(req, res) {
    try {
      const products = await productService.getProduct();
      console.log(products);
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async showProduct(req, res) {
    try {
      const product = await productService.showProduct();
      return res.status(200).send(product);
    } catch (error) {
      let status = error.notFound ? 404 : 500
      return res.status(status).send(error);
    }
  }
  
  static async createProduct(req, res) {
    try {
      const products = await productService.createProduct();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = productController;
