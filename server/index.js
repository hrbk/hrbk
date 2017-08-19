const express = require('express');
const db = require('../database');
const path = require('path');
const dbHelpers = require('../database/helpers')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use(passport.initialize());
app.use(passport.session());

require('./passport.js')(passport, LocalStrategy);

app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
  res.send(req.user);
  }
);

app.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.send(req.user);
    console.log('HELLO');
  }
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/signin');
  }
}

app.get('/search', function(req, res) {
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log('process.env.PORT:', port);
});
