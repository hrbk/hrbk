const db = require('./index'); 

/**
 * A simple find function for the MySql database.
 * @param  {[String]} query    Depending on the table, a string representing the column to retrieve. The available options for the users table: 'id', 'email', 'userphoto', 'firstname', 'lastname', password, 'salt'. For the profiles table: 'id', 'userid', 'address', 'city', 'state', 'zipcode', 'title', 'description', 'photopath'. Pass in '*' for all columns.
 * @param  {String} table    One of two tables that can be queried. Either 'users' or 'profiles'.
 * @param  {Function} callback    A callback applied to the results of the query on the database. Can be implemented when the 'find' function is called to manipulate the resulting data.
 */
var find = function(query, table, callback) {
  table = table || 'profiles';
  var sql = `SELECT ${query} FROM ${table};`;
  db.query(sql, function(err, res) {
    callback(res); 
  });
};

var findUserByEmailAndPassword = function(email, password, callback) {
  var sql = `SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
  db.query(sql, function(err, res) {
    callback(res[0]);
  })
}

var findUserByEmail = function(email, callback) {
  var sql = `SELECT * FROM users WHERE email = ${email}`;
  console.log('query:', sql);
  db.query(sql, function(err, res) {
    callback(res[0]);
  })
}

var findUserAndProfileByEmail = function(email, callback) {
  var sql = `SELECT * FROM users INNER JOIN profiles ON users.id = profiles.userid WHERE users.email = ${email}`;
  db.query(sql, function(err, res) {
    callback(res[0]);
  })
}

var findByID = function(id, callback) {
  var sql = `SELECT * FROM users where id=` + id;
  db.query(sql, function(err, res) {
    callback(res[0]);
  });
}

/**
 * addUser function that passes given information into the users database table.
 * @param  {String} email    An email address associated with the user.
 * @param  {String} userphoto    A url path to an image file or image url used for the thumbnail on the listings page.
 * @param  {String} firstname    The first name of the user. There are no usernames, and specific identification is tied to email and name combinations.
 * @param  {String} lastname   The last name of the user.
 * @param  {String} password   The password provided by the user. An early mvp-adopted model before hashing and salt are implemented.
 * @param  {Function} callback   Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful.
 */
var addUser = function(email, userphoto, firstname, lastname, password, salt, callback) {
  var options = [email, userphoto, firstname, lastname, password, salt]; 
  
  var sql = `
    INSERT INTO users (email, userphoto, firstname, lastname, password, salt)
    VALUES (?, ?, ?, ?, ?, ?);`;
  db.query(sql, options, function(err, res) {
    callback();
  });
};

  /**
 * If the information regarding a user's home or listing is being passed through as a single object rather than through separate parameters, use addListing
 * @param  {Object} userObj   An object containing the pertinent user information for the users table in the database. The keys of the object should be: 'id', 'address', 'city', 'zipcode', 'title', 'description', 'photopath'. Note that a separate query should eventually be created with the user's email address to find the user's id to link the information between user and profile together in the database.
 */
//TODO: create USER FOREIGN KEY functionality
var addListing = function(id, userObj, callback) {
  //if user is going to be sent as stringified object;
  
  var user = userObj;

  var options = [id, user.address, user.city, user.state, user.zipcode, user.title, user.description, user.photopath]; 
  var sql = `
    INSERT INTO profiles (userid, address, city, state, zipcode, title, description, photopath)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  db.query(sql, options, function(err, res) {
    console.log(options, res);
    callback();
  });
};

/**
 * filterByCity function that can provide listing information from the profiles table of the database based on a specific United States city. Plans to include international cities will be implemented in the near future.
 * @param  {String} city   A city within the United States. This should have been properly formatted by Google Autocomplete Places to reduce possible issues of typos or syntactical errors. No further formatting of this parameter should be necessary. Searching by a zipcode to include radius-wide search may be implemented in the near future.]
 * @param  {Function} callback   Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful.
 */
var filterByCity = function(city, callback) {
  var sql = `
    SELECT * FROM profiles WHERE city = "${city}";`;
  db.query(sql, (err, res) => (err ? callback(err) : callback(res)));
};

/**
 * filterByOption allows you to specify the column and additional options to query. For example, passing 'city' and 'San Francisco' will yield listings from San Francisco.
 * @param  {String}   column   Any of the columns from profile table of the database: 'id', 'userid', 'address', 'city', 'state', 'zipcode', 'title', 'description', 'photopath'. Recommended columns for use are 'city', 'zipcode', and 'state'. 
 * @param  {String/Number}   option   Any specificity towards the column parameter. The parameter can either be a string or number, depending on which column is being used.
 * @param  {Function} callback Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful.
 */
var filterByOption = function(column, option, callback) {
  var sql = `
    SELECT * FROM profiles WHERE ${column} = "${option}";`;
  db.query(sql, (err, res) => err ? callback(err) : callback(res));
};

module.exports.find = find;
module.exports.addUser = addUser;
module.exports.filterByCity = filterByCity;
module.exports.filterByOption = filterByOption;
module.exports.addListing = addListing;
module.exports.findUserByEmailAndPassword = findUserByEmailAndPassword;
module.exports.findByID = findByID;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserAndProfileByEmail = findUserAndProfileByEmail;

