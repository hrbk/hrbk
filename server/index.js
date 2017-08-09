var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', function(req, res) {
  res.send('Hello World');
});


app.listen(port, () => {
	console.log('process.env.PORT:', process.env.PORT); 
});
