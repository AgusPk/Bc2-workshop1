const { query } = require("../repositories/main.repository");

class cartDao {
  static existsActive(userId) {
    const checkActiveQuery = `SELECT * FROM Cart WHERE userId = ?`;
    return query(checkActiveQuery, userId);
  }

  static createActiveCart(newCart) {
    const createActiveQuery = `INSERT INTO Cart (userId,estado) values (?)`;
    return query(createActiveQuery, newCart);
  }

  static deleteCart({ cartId, userId }) {
    const sql = `DELETE FROM Cart WHERE id = ${cartId} AND userId = ${userId} AND estado = "activo" `;
    return query(sql, id);
  }

  static getAll() {
    const sql = `SELECT * FROM Cart`;
    return query(sql);
  }

  // static update(invoiceId, id, price, units, discount, description, createdAt) {
  //   let filters = "";
  //   const queryParams = [];
  //   let fields = 0;

  //   if (invoiceId) {
  //     filters += `invoiceId = ?`;
  //     queryParams.push(invoiceId);

  //     fields++;
  //   }

  //   if (id) {
  //     if (fields > 0) filters += `,`;

  //     filters += `id = ?`;
  //     queryParams.push(id);

  //     fields++;
  //   }
  //   if (units) {
  //     if (fields > 0) filters += `,`;

  //     filters += `units = ?`;
  //     queryParams.push(units);

  //     fields++;
  //   }

  //   if (discount) {
  //     if (fields > 0) filters += `,`;

  //     filters += `discount = ?`;
  //     queryParams.push(discount);

  //     fields++;
  //   }

  //   if (price) {
  //     if (fields > 0) filters += `,`;

  //     filters += `price = ?`;
  //     queryParams.push(price);

  //     fields++;
  //   }

  //   if (description) {
  //     if (fields > 0) filters += `,`;

  //     filters += `description = ?`;
  //     queryParams.push(description);

  //     fields++;
  //   }

  //   let sql = `UPDATE item SET ${filters} WHERE id = ?`;

  //   queryParams.push(id);

  //   return query(sql, queryParams);
  // }
  // static exists(value, field) {
  //   const sql = `SELECT COUNT(*) AS 'exists' FROM Item WHERE ${field} = ?`;
  //   return query(sql, value);
  // }

  // static existsInvoice(value, field) {
  //   const sql = `SELECT COUNT(*) AS 'exists' FROM Item WHERE ${field} = ?`;
  //   return query(sql, value);
  // }

  // static get(id) {
  //   const sql = `SELECT * FROM Item WHERE id = ?`;
  //   return query(sql, id);
  // }
}

module.exports = cartDao;
