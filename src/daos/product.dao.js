const { query } = require("../repositories/main.repository");

class productDao {
  static get(category) {
    let productsQuery = "SELECT * FROM Product";
    const queryParams = [];
    if (category) {
      productsQuery += "WHERE categoria = ?";
      queryParams.push(category);
    }
    return query(productsQuery, queryParams);
  }
  static show(id) {
    const sql = `SELECT * FROM Product WHERE id = ?`;

    return query(sql, id);
  }

  static create(product) {
    const productsQuery =
      "INSERT INTO Product (categoria,nombre,cantidad, descripcion)values(?,?,?,?)";
    return query(productsQuery, product);
  }

  static exists(value, field) {
    const sql = `SELECT COUNT(*) AS 'exists' FROM Product WHERE ${field} = ?`;

    return query(sql, value);
  }

  static delete(id) {
    const sql = `DELETE FROM Product WHERE id = ?`;

    return query(sql, id);
  }

  static update(id, categoria, nombre, cantidad, descripcion) {
    let filters = "";
    const queryParams = [];
    let fields = 0;

    if (categoria) {
      filters += `categoria = ?`;
      queryParams.push(categoria);

      fields++;
    }

    if (nombre) {
      if (fields > 0) filters += `,`;

      filters += `nombre = ?`;
      queryParams.push(nombre);

      fields++;
    }
    if (cantidad) {
      if (fields > 0) filters += `,`;

      filters += `cantidad = ?`;
      queryParams.push(firstName);

      fields++;
    }

    if (descripcion) {
      if (fields > 0) filters += `,`;

      filters += `descripcion = ?`;
      queryParams.push(firstName);

      fields++;
    }

    let sql = `UPDATE Invoice SET ${filters} WHERE id = ?`;

    queryParams.push(id);
    return query(sql, queryParams);
  }
}

module.exports = productDao;
