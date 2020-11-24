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
}

module.exports = productController;
