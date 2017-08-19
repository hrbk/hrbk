const Promise = require('bluebird');
const Sequelize = require('sequelize');

/**
 * Exports a function that returns a query to create a users table if it does not exit, then creates a profiles table if it does not exist. Errors fall through the promise chain to console log an error message.
 */
module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(50),
      userphoto VARCHAR(50),
      firstname VARCHAR(50),
      lastname VARCHAR(50),
      password VARCHAR(80),
      salt VARCHAR(50)
      email VARCHAR(100),
      userphoto VARCHAR(100),
      firstname VARCHAR(100),
      lastname VARCHAR(100),
      password VARCHAR(100),
      salt VARCHAR(100)
    );`)
  .then(() => {
    return db.queryAsync(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userid INT,
        address VARCHAR(100),
        city VARCHAR(50),
        state VARCHAR(20),
        zipcode INT,
        title VARCHAR(100),
        description VARCHAR(300),
        photopath VARCHAR(50),
        title VARCHAR(250),
        description VARCHAR(1000),
        photopath VARCHAR(200),
        FOREIGN KEY (userid) REFERENCES users(id)
      );`);
    })
    .error(err => {
      console.log('error creating database: ', err)
    });
}
