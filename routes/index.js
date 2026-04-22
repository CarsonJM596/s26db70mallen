var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

// Home
router.get('/', function (req, res) {
  res.render('index', { title: 'Costume App', user: req.user });
});

// Register GET
router.get('/register', function(req, res) {
  res.render('register', { title: 'Costume App Registration' });
});

// Register POST
router.post('/register', function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(user) {
      if (user != null) {
        console.log("exists " + req.body.username);
        return res.render('register', {
          title: 'Registration',
          message: 'Existing User',
          account: req.body.username
        });
      }

      let newAccount = new Account({ username: req.body.username });

      Account.register(newAccount, req.body.password, function(err, user) {
        if (err || !user) {
          console.log("db creation issue " + err);
          return res.render('register', {
            title: 'Registration',
            message: 'Access error',
            account: req.body.username
          });
        }

        console.log('Success, redirect');
        res.redirect('/');
      });
    })
    .catch(function(err) {
      return res.render('register', {
        title: 'Registration',
        message: 'Registration error',
        account: req.body.username
      });
    });
});

// Login GET
router.get('/login', function(req, res) {
  res.render('login', { title: 'Costume App Login', user: req.user });
});

// Login POST
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

// Logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Ping route
router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;