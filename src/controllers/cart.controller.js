const cartService = require("../services/cart.service");

class cartController {
  static async postCart(req, res) {
    try {
      const { userId } = req.params;
      const checkCart = await cartService.checkCart(userId);
      return res.status(200).send(checkCart);
    } catch (err) {
      return res.send(err);
    }
  }
  static async deleteCart(req, res) {
    try {
      const { cartId } = req.params;
      const userId = 1;
      const deleteCart = await cartService.deleteCart({
        cartId,
        userId,
      });
      if (deleteCart.affectedRows === 0) return res.status(400).send({});
      return res.status(200).send(deleteCart);
    } catch (err) {
      return res.send(err);
    }
  }

  static async getAllCarts(req, res) {
    try {
      const getAllCarts = await cartService.getAllCarts();
      return res.status(200).send(getAllCarts);
    } catch (err) {
      return res.send(err);
    }
  }
}

// updateCart;
// getProductosInCart;
// postProductosInCart;
// deleteProductosInCart;
module.exports = cartController;
