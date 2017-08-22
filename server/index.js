const express = require('express');
const db = require('../database');
const path = require('path');
const dbHelpers = require('../database/helpers')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

const app = express();
/**
 * Port is set either to the process.env.PORT given by Heroku or defaults to 3000
 */
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

/**
 * Get method that receives a request from the client side and passes it towards the database. The request will be formatted by being served through Google Autocomplete Places. Conditionals are set in place in order of locality depending on what the users may query in the search bar. City is the most ideal, but the filter function for the database will default if no city is defined. The same goes for state. Currently, although a default for country exists within this function, the database does not have a column for country. There currently is no error handling; just a res.json for the data received.
 */
app.get('/search', function(req, res) {
	console.log(req.query.data)
	const { city, state, country } = JSON.parse(req.query.data);
	if ( city ) {
		dbHelpers.filterByCity(city, (data) => {
      console.log('RESPONSE', data);
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

app.post('/upload', upload.single('file'), function(req, res) {
  var file = req.file.destination + req.file.originalname;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.originalname
      });
    }
  });
});

app.post('/updateUserProfile', (req, res) => {
  const { filepath, userEmail } = req.body;

  dbHelpers.updateUserByEmail('userphoto', filepath, userEmail, (data) => {
    res.json(data);
  });
});

app.post('/updateListingImage', (req, res) => {
  const { filepath, userId } = req.body;

  dbHelpers.updateTableById('profiles', 'photopath', filepath, userId, (data) => {
    res.json(data);
  })
});


app.get('/cities', (req, res) => {
  dbHelpers.find('*', 'profiles', (data) => {
  	res.json(data);
  })
});

app.get('/search/:profileId', (req, res) => {
	dbHelpers.filterByOption('userid', req.params.profileId, (data) => {
    console.log(data);
		res.json(data);
	})
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log('process.env.PORT:', port);
});
