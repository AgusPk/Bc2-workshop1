const cartDao = require("../daos/cart.dao");

class cartService {
  static async checkCart(userId) {
    const cartStateResult = await cartDao.existsActive(userId, "userId");
    const isActive = cartStateResult.filter((item) => item.estado === "activo");

    if (isActive.length > 0) {
      return isActive;
    }

    const createActiveCart = await cartDao.createActiveCart({
      userId,
      estado: "activo",
    });

    return { isActive, cartStateResult, createActiveCart };
  }

  static async deleteCart(cartId) {
    const deleteCartResponse = await cartDao.deleteCart(cartId);
    console.log(deleteCartResponse);
    return deleteCartResponse;
  }

  static async getAllCarts() {
    const getAllCartsResponse = await cartDao.getAll();
    return getAllCartsResponse;
  }
}

module.exports = cartService;
