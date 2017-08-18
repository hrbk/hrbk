const express = require('express');
const db = require('../database');
const path = require('path');
const dbHelpers = require('../database/helpers')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
//const authentication = require('../passport.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dbHelpers.findByID(id, (user) => {
    if (user) {
      done(null, user);
    } 
  });
});


passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {
    console.log('GOT INTO WRONG MIDDLEWARE');
    //var User = user;
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass, function(err, res) {});
    }

    dbHelpers.findUserByEmailAndPassword(JSON.stringify(email), JSON.stringify(password), function(user) {

      if (!user) {
        // console.log('email does not exist:', user);
        return done(null, false, {message: 'Email does not exist'});
      } else {
        bCrypt.compare(password, user.password, function(err, res) {
          if (res === false) {
            return done(null, false, {message: 'Incorrect password'});
          } else {
            console.log('success')
            return done(null, user);
          }
        })
      } 
    })
  })
);

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {

    //console.log(req.body);

    dbHelpers.findUserByEmail(JSON.stringify(email), function(user) {
      console.log('USER', user);
      if (user[0]) {
        return done(null, false, {message: "This email has been taken"});

      } else {
        console.log('ABOUT TO ENCRYPT');
        bCrypt.genSalt(8, function(err, salt) {
          console.log('GENERATED SALT:', salt);

          bCrypt.hash(password, salt, null, function(err, hash) {
            console.log('bCrypt hash:', hash);

            dbHelpers.addUser(email, req.body.userphoto, req.body.firstname, req.body.lastname, hash, salt, function() {

              dbHelpers.findUserByEmail(JSON.stringify(email), function(userFromDb) {
                dbHelpers.addListing(userFromDb[0].id, req.body, function() {

                  var newUser = new Object();
                  newUser.id = userFromDb[0].id;
                  newUser.email = email;
                  newUser.password = hash;

                  return done(null, newUser);
                })
              });
            });
          });
        });
      }
    });
  }
));

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
}), function(req, res) {
  res.sendStatus(201);
  }
);

    //
app.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/dashboard'
  }), function(req, res) {
    res.send(req.user);
    console.log('HELLO');
  }
);

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
