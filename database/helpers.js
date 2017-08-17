const db = require('./index'); 


var find = function(query, table, callback) {
/**
 * @param {string} query: type of
 * @param {string} table: id your table 
 * to select all, pass '*' as query; 
*/
  table = table || 'profiles';
  var sql = `SELECT ${query} FROM ${table};`;
  db.query(sql, function(err, res) {
    callback(res); 
  });
};

var addUser = function(email, userphoto, firstname, lastname, password, callback) {
/**
 * @param {string} 
 * to select all, pass '*' as query
*/
  var options = [email, userphoto, firstname, lastname, password]; 
  
  var sql = `
    INSERT INTO users (email, userphoto, firstname, lastname, password)
    VALUES (?, ?, ?, ?, ?);`;
  db.query(sql, options, function(err, res) {
    callback(res);
  });
};

//TODO: create USER FOREIGN KEY functionality
var addListing = function(userObj) {
  //if user is going to be sent as stringified object;
  user = JSON.parse(userObj);

  var options = [
    user.id, user.address, user.city, user.state, 
    user.zipcode, user.title, user.description, user.photopath
  ]; 

  var sql = `
    INSERT INTO profiles (id, address, city, state, zipcode, title, description, photopath)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  db.query(sql, options);
};

//TEST: add a listing;
var listing = {
  id: '223',
  address: '222',
  city: 'new york',
  state: 'california',
  zipcode: '94109',
  title: 'title', 
  description: 'description house',
  photopath: null
};
  //addListing(JSON.stringify(listing))
  //uncomment, and change the above to add a listing
//end of add listing test


var filterByCity = function(city, callback) {
  var sql = `
    SELECT * FROM profiles WHERE city = "${city}";`;
  db.query(sql, (err, res) => callback(res));
};

var filterByOption = function(column, option, callback) {
  var sql = `
    SELECT * FROM profiles WHERE ${column} = "${option}";`;
  db.query(sql, (err, res) => callback(res)); //fn err,res inside
  //once qurey sends response, call
};

//TEST: filter by city.
// console.log(filterByOption('city', 'san francisco', (res) => {
//   console.log(res)}
// ));
//end of filter by city test

module.exports.find = find;
module.exports.addUser = addUser;
module.exports.filterByCity = filterByCity;
module.exports.filterByOption = filterByOption;
module.exports.addListing = addListing;

