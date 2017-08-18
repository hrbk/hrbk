const bCrypt = require('bcrypt-nodejs');
const express = require('express');
const db = require('./database');
const dbHelpers = require('./database/helpers.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {

    db.Helpers.findUserByEmail(email, function(user) {
      if (user) {
        return done(null, false, {message: "This email has been taken"});

      } else {

        bCrypt.hash(password, bCrypt.genSalt(8), function(err, hash) {

          dbHelpers.addUser(email, req.user.userphoto, req.user.firstName, req.user.lastName, hash, function(newUser) {

            dbHelpers.addListing(req.profile, function(newListing) {
              return done(null, newListing);
            })
          })
        });
      }
    })
  }
));

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
}), function(req, res) {
  res.sendStatus(201);
})