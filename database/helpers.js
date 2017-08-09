
/** 
 * find all rows from the db.
 * @func find 
*/

var findAll = function(model, query) {
/**
 * @method
 * @param {} sequelize : id your table
 * @param {} query
 * @callback {} model <pathname> 
*/
  if (query) {
  	return model.findAll(query)
  } else {
  	return model.findAll()
  }
};

var find = function(model, query) {
  //query 
  return model.find(query);
};

var saveRow = function(model, row) {
  //save the row to the model;
  model.create(row)
};

// exports.findAll = find;
// exports.saveRow = saveRow;
//exports.find = find;