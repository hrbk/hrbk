const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  //Create users Table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(50),
      userphoto VARCHAR(50),
      firstname VARCHAR(50),
      lastname VARCHAR(50),
      password VARCHAR(50),
      salt VARCHAR(50)
    );`)
  .then(() => {
    // Create profiles Table
    return db.queryAsync(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userid INT,
        address VARCHAR(100),
        city VARCHAR(25),
        state VARCHAR(10),
        zipcode INT,
        title VARCHAR(25),
        description VARCHAR(100),
        photopath VARCHAR(50),
        FOREIGN KEY (userid) REFERENCES users(id)
      );`);
    })
    .error(err => {
      console.log('error creating database: ', err)
    });
}
