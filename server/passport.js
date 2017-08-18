const bCrypt = require('bcrypt-nodejs');
const express = require('express');
const dbHelpers = require('../database/helpers.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, LocalStrategy) {
  
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

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) { //email and password in plain text format

      dbHelpers.findUserByEmail(JSON.stringify(email), function(user) {
    
        if (user[0]) {
          return done(null, false, {message: "This email has been taken"});

        } else {
          
          bCrypt.genSalt(8, function(err, salt) {

            bCrypt.hash(password, salt, null, function(err, hash) {

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

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) { //email and password in plain text format
      
      dbHelpers.findUserByEmail(JSON.stringify(email), function(user) {
        if (!user) {
          return done(null, false, {message: 'Email does not exist'});

        } else {

          bCrypt.compare(password, user[0].password, function(err, res) {
            if (!res) { //res === false
              return done(null, false, {message: 'Incorrect password'});

            } else {
              return done(null, user[0]);
            }
          })
        } 
      })
    })
  );
}