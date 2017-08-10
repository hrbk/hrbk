const mysql = require('mysql');
const Promise = require('bluebird');
const createTables = require('./config');
const database = 'homeswap';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'homeswap'

});

const db = Promise.promisifyAll(connection, { muliArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));


module.exports = db;
