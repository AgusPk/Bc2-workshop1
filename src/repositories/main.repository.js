const MysqlRepository = require('./mysql.repository')
const { mainDatabase } = require('../config')

let base = null;

/**
 * Connect to database and set pool
 */
const connect = () => {
    const { host, user, pass, name } = mainDatabase;

    base = new MysqlRepository(host, user, pass, name);
    base.connect();
}

/**
 * force destroy mysql connection
 */
const disconnect = () => base.disconnect();

/**
 * Handles querying alongside with logging
 * @param {string} query 
 * @param {Object} values
 */
const query = (query, values) => base.query(query, values);
const escapeId = (identifier) => base.escapeId(identifier);

module.exports = { connect, disconnect, query, escapeId };