const { query } = require("../repositories/main.repository");

class cartDao {
  static existsActive(userId) {
    const checkActiveQuery = `SELECT * FROM Cart WHERE userId = ?`;
    return query(checkActiveQuery, userId);
  }

  static createActiveCart({ userId, estado }) {
    const createActiveQuery = `INSERT INTO Cart (userId,estado) values (? , ?)`;
    return query(createActiveQuery, [userId, estado]);
  }

  static deleteCart({ cartId, userId }) {
    const sql = `DELETE FROM Cart WHERE id = ? AND userId = ? AND estado = "activo"`;
    return query(sql, [cartId, userId]);
  }

  static getById(cartId) {
    const sql = `SELECT * FROM Cart WHERE id = ?`;
    return query(sql, [cartId]);
  }

  static getAll() {
    const sql = `SELECT * FROM Cart`;
    return query(sql);
  }

  static updateCart({ cartId }) {
    const sqlCart = "UPDATE Cart SET estado='cerrado' WHERE id = ?";
    return query(sqlCart, [cartId]);
  }

  static getProductosInCart({ cartId }) {
    const sqlCart =
      "SELECT * from CartProduct INNER JOIN Product ON (Product.id = CartProduct.productId) WHERE cartId = ? ";
    return query(sqlCart, [cartId]);
  }

  static async postProductosInCart({ cartId, productId, userId }) {
    const sqlCheckCartState =
      "SELECT * FROM Cart WHERE id = ? AND userId = ? AND estado='activo' ";
    const sqlCheckCartProduct = "SELECT * FROM CartProduct WHERE cartId = ? ";
    const sqlCheckProduct = "SELECT * FROM Product WHERE id = ?";
    const activeCart = await query(sqlCheckCartState, [cartId, userId]);
    const cartProduct = await query(sqlCheckCartProduct, [cartId]);
    const checkProduct = await query(sqlCheckProduct, [productId]);

    return { activeCart: activeCart[0], product: checkProduct[0], cartProduct };
  }

  static async postInPivot({ cartId, productId }) {
    const sqlPostInPivot = `INSERT INTO CartProduct (cartId,productId) values (? , ?)`;
    const cartProduct = await query(sqlPostInPivot, [cartId, productId]);

    return cartProduct;
  }
}

module.exports = cartDao;
