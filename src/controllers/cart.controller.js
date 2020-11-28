const cartService = require("../services/cart.service");

class cartController {
  static async postCart(req, res) {
    try {
      const { userId } = req.params;
      const checkCart = await cartService.checkCart(userId);
      return res
        .status(checkCart.msg === "founded" ? 400 : 201)
        .send(checkCart);
    } catch (err) {
      return res.send(err);
    }
  }
  static async deleteCart(req, res) {
    try {
      const { cartId, userId } = req.params;
      const deleteCart = await cartService.deleteCart({
        cartId,
        userId,
      });
      if (deleteCart.affectedRows === 0)
        return res
          .status(400)
          .send({ msg: "ID de carro inválido o estado Cerrado" });
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

  static async updateCart(req, res) {
    try {
      const { cartId, userId } = req.params;
      const updateCart = await cartService.updateCart({ cartId, userId });

      if (updateCart.msg === "updated") {
        return res.status(200).send(updateCart);
      }
      return res
        .status(400)
        .send("ID de carro invalido o carro en estado Cerrado");
    } catch (err) {
      return res.send(err);
    }
  }

  // Dado el ID de un carro,
  // devolver todos los productos que se encuentren en él
  // , solo si le pertenece al Comprador.

  static async getProductosInCart(req, res) {
    try {
      const { cartId } = req.params;

      const getProductosInCart = await cartService.getProductosInCart({
        cartId,
      });

      return res.status(200).send(getProductosInCart);
    } catch (err) {
      return res.send(err);
    }
  }

  static async postProductosInCart(req, res) {
    try {
      const { cartId, productId } = req.params;

      const postProductosInCart = await cartService.postProductosInCart({
        cartId,
        productId,
      });

      return res.status(200).send(postProductosInCart);
    } catch (err) {
      return res.send(err);
    }
  }
}

// deleteProductosInCart;
module.exports = cartController;
