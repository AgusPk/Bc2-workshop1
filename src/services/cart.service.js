const cartDao = require("../daos/cart.dao");

class cartService {
  static async checkCart(userId) {
    const cartStateResult = await cartDao.existsActive(userId, "userId");
    const isActive = cartStateResult.filter((item) => item.estado === "activo");

    if (isActive.length > 0) {
      return { msg: "founded", isActive: isActive[0] };
    }

    const createActiveCart = await cartDao.createActiveCart({
      userId,
      estado: "activo",
    });

    const idCart = createActiveCart.insertId;

    const lastCartCreated = await cartDao.getById(idCart);

    return { msg: "created", lastCartCreated };
  }

  static async deleteCart({ cartId, userId }) {
    const deleteCartResponse = await cartDao.deleteCart({
      cartId,
      userId,
    });
    return deleteCartResponse;
  }

  static async getAllCarts() {
    const getAllCartsResponse = await cartDao.getAll();
    return getAllCartsResponse;
  }

  static async updateCart({ cartId, userId }) {
    const updateCart = await cartDao.updateCart({ cartId, userId });
    if (updateCart.changedRows > 0) {
      const getCartUpdated = await cartDao.getById(cartId);
      return { msg: "updated", getCartUpdated: getCartUpdated };
    }
    return updateCart;
  }

  static async getProductosInCart({ cartId }) {
    const getProductosInCart = await cartDao.getProductosInCart({
      cartId,
    });

    return getProductosInCart;
  }

  static async postProductosInCart({ cartId, productId }) {
    const userId = 7;
    const postProductosInCart = await cartDao.postProductosInCart({
      cartId,
      productId,
      userId,
    });

    if (!postProductosInCart.activeCart.id)
      return { msg: "cart not founded", postProductosInCart };

    if (!postProductosInCart.product.id)
      return { msg: "product not founded", postProductosInCart };

    const postInPivot = await cartDao.postInPivot({ cartId, productId });

    return postProductosInCart;
  }
}

module.exports = cartService;
