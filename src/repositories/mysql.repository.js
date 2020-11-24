const util = require('util');
const mysql = require('mysql');
const xid = require('xid-js');

class MysqlRepository {
  constructor(host, user, pass, name) {
    this.host = host;
    this.user = user;
    this.pass = pass;
    this.name = name;
    this.pool = null;
  }

  connect() {
    this.pool = mysql.createPool({
      connectionLimit: 50,
      host: this.host,
      user: this.user,
      password: this.pass,
      database: this.name,
    });

    // Ping database to check for common exception errors.
    this.pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
        } else if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
        } else {
          console.error(err);
        }
        throw err;
      }
      if (connection) connection.release();
      return;
    });

    // Promisify for Node.js async/await.
    this.pool.query = util.promisify(this.pool.query);
  }

  /**
   * Force destroy mysql connection
   */
  disconnect() {
    return new Promise((resolve, reject) => {
      this.pool.end(err => {
        if (err !== undefined) {
          reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Handles querying alongside with logging
   * @param {string} query
   * @param {Object} values
   */
  async query(query, values) {
    const id = xid.next();
    console.info(
      `Making query with ID ${id} to ${this.name} pool with value: ${query}`
    );
    console.time(id);
    try {
      // https://github.com/mysqljs/mysql#escaping-query-values -> how to escape values for queries
      const result = await this.pool.query(query, values);
      console.info(`${this.name} pool request Successful! ID: ${id}`);
      console.timeEnd(id);
      return result;
    } catch (error) {
      console.error(
        `Error on ${this.name} pool request. ID: ${id} with value: ${error.sql}`
      );
      console.timeEnd(id);
      throw error;
    }
  }

  escapeId(identifier) {
    return this.pool.escapeId(identifier);
  }
}

module.exports = MysqlRepository;
