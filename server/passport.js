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
    
        if (user) {
          return done(null, false, {message: "This email has been taken"});

        } else {
          
          bCrypt.genSalt(8, function(err, salt) {

            bCrypt.hash(password, salt, null, function(err, hash) {

              dbHelpers.addUser(email, req.body.userphoto, req.body.firstname, req.body.lastname, hash, salt, function() {

                dbHelpers.findUserByEmail(JSON.stringify(email), function(userFromDb) {

                  dbHelpers.addListing(userFromDb.id, req.body, function() {

                    var newUser = req.body;
                    newUser.id = userFromDb.id;
                    delete newUser.password;
                    delete newUser.salt;

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
      
      dbHelpers.findUserAndProfileByEmail(JSON.stringify(email), function(user) {
        if (!user) {
          return done(null, false, {message: 'Email does not exist'});

        } else {

          bCrypt.compare(password, user.password, function(err, res) {
            if (!res) { //res === false
              return done(null, false, {message: 'Incorrect password'});

            } else {
              //return all user info minus the password and salt
              //better way to do this: let {password, salt, ...userInfo} = user; but babel plugin not working
              var currentUser = user;
              delete currentUser.password;
              delete currentUser.salt;

              return done(null, currentUser);
            }
          })
        } 
      })
    })
  );
}