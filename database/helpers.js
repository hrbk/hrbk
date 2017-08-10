const db = require('./index'); 

var find = function(query, table) {
/**
 * @param {string} query: type of
 * @param {string} table: id your table 
 * to select all, pass '*' as query; 
*/

  table = table || 'profiles';
  var sql = 'SELECT ' + query + ' FROM ' + table;
  db.query(sql);
};

var addUser = function(email, userphoto, firstname, lastname, password) {
/**
 * @param {string} 
 * to select all, pass '*' as query
*/
  var sql = `
  	INSERT INTO users (email, userphoto, firstname, lastname, password)
    VALUES (` + email + ', ' + userphoto + ', ' + firstname + ', ' + lastname + ', ' + password + ')';
  db.query(sql);
};

var dropTable = function(table) {
  var sql = 'DROP TABLE ' + table;
  db.query(sql);
}
//tests: 

//before each test;
//access db;
   
//1st
  //add user into users;

    addUser('aemail', 'aphoto', 'afirstname', 'alastname', 'apassword');
    //check db table users;
    var userTest = find('*', 'users')
    console.log('user added ', userTest);
    dropTable('users');


exports.find = find;
exports.addUser = addUser;
