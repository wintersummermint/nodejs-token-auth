var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/register');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

/* configure passport */
passport.use(new LocalStrategy(
  function(email, password, done) {

    //on models -> findUser() which checks the email.
    User.findUser(email, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('unknown user')
        return done(null, false, { message: 'Incorrect email.' });
      }

      //on models -> comparePassword() which matches encrypted password.
      User.comparePassword(password,user.password, function(err, match){
        if (err)  { return done(err); }
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));


// sessions on passport 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //call findId on models
  User.findId(id, function(err, user) {
    done(err, user);
  });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login' , failureFlash : 'Invalid Username or Password' }), function(req,res, next){
	console.log('successfull login!');
	res.redirect('/members');
});


module.exports = router;
