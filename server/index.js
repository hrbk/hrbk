const express = require('express');
const db = require('../database');
const path = require('path');
const dbHelpers = require('../database/helpers')
const bodyParser = require('body-parser');

const app = express();
/**
 * Port is set either to the process.env.PORT given by Heroku or defaults to 3000
 */
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

/**
 * Get method that receives a request from the client side and passes it towards the database. The request will be formatted by being served through Google Autocomplete Places. Conditionals are set in place in order of locality depending on what the users may query in the search bar. City is the most ideal, but the filter function for the database will default if no city is defined. The same goes for state. Currently, although a default for country exists within this function, the database does not have a column for country. There currently is no error handling; just a res.json for the data received.
 */
app.get('/search', function(req, res) {
	console.log(req.query.data)
	const { city, state, country } = JSON.parse(req.query.data);
	if ( city ) {
		dbHelpers.filterByCity(city, (data) => {
			res.json(data);
		});
	}
	else if ( state ) {
		dbHelpers.filterByOption('state', state, (data) => {
			res.json(data);
		});
	}
	else if ( country ) {
		dbHelpers.filterByOption('country', country, (data) => {
			res.json(data);
		});
	}
});

app.get('/search/:profileId', (req, res) => {
	dbHelpers.filterByOption('id', req.params.profileId, (data) => {
		res.json(data);
	})
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log('process.env.PORT:', port);
});
