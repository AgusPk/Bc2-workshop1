const { query } = require("../repositories/main.repository");

const userDao = {
  get: () => {
    const sql = "select * from User";
    return query(sql);
  },

  getOne: (id) => {
    const sql = `select email, firstName, userName, lastName, role, createdAt from User where id = ?`;
    return query(sql, id);
  },

  signUp: (user) => {
    const sql = `INSERT INTO User (userName, firstName,
      lastName, email, password, role) 
        values (?, ?, ?, ?, ?, ?)`;

    return query(sql, user);
  },

  exists: (value, field) => {
    const sql = `select count(*) as 'exists' from User where ${field} = ?`;
    return query(sql, value);
  },

  delete: (id) => {
    const sql = `delete from User where id = ?`;
    return query(sql, id);
  },

  update: (id, { email, userName, firstName, lastName, role }) => {
    let filters = "";
    const queryParams = [];
    let fields = 0;

    if (email) {
      filters += `email = ?`;
      queryParams.push(email);

      fields++;
    }

    if (userName) {
      if (fields > 0) filters += `,`;

      filters += `userName = ?`;
      queryParams.push(userName);

      fields++;
    }
    if (firstName) {
      if (fields > 0) filters += `,`;

      filters += `firstName = ?`;
      queryParams.push(firstName);

      fields++;
    }

    if (lastName) {
      if (fields > 0) filters += `,`;

      filters += `lastName = ?`;
      queryParams.push(lastName);

      fields++;
    }

    if (role) {
      if (fields > 0) filters += `,`;

      filters += `role = ?`;
      queryParams.push(role);

      fields++;
    }

    let sql = `UPDATE User SET ${filters} WHERE id = ?`;

    queryParams.push(id);

    return query(sql, queryParams);
  },
};

module.exports = userDao;
