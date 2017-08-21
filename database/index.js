const mysql = require('mysql');
const Promise = require('bluebird');
const createTables = require('./config');
const database = 'homeswap';

/**
 * mysql connection; change the host, user, database, and add a password  for the database as necessary to establish a connection.
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'homeswap',
  password: 'Unclejoe123!'
});

/**
 * Promisifies the entire object by going through the object's properties and creating an async equivalent of each function on the object and its prototype chain.
 */
const db = Promise.promisifyAll(connection, { muliArgs: true });

/**
 * Promise chain that first connects to the database, console logs the successfull connection, creates the database listed in the connection parameters if one does not already exists, and uses that database.
 * @type {[type]}
 */
db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));

module.exports = db;
