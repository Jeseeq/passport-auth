"use strict"
const express = require('express');
const validator = require('validator');
const router = express.Router();
const passport = require('passport');

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  let validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
  }

  passport.authenticate('local-signup', function(err, token) {
    if (err) {
        // duplicate email error
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(409).json({ success: false, message: "Check the form for errors.", errors: { email: "This email is already taken." } });
      }

      return res.status(400).json({ success: false, message: "Could not process the form." });
    }

    return res.status(200).cookie('auth_token', token, {
      maxAge: 60 * 60 * 24 * 7 * 1000,    // 7d
      path: '/',
      httpOnly: true
    }).json({ success: true, message: "You have successfully logged in!"});
  })(req, res, next);

});

router.post('/login', function(req, res, next) {
  let validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
  }

  passport.authenticate('local-login', function(err, token) {
    if (err) {
      if (err.name === "IncorrectCredentialsError") {
        return res.status(400).json({ success: false, message: err.message });
      }

      return res.status(400).json({ success: false, message: "Could not process the form." });
    }

    return res.cookie('auth_token', token, {
      maxAge: 60 * 60 * 24 * 7 * 1000,    // 7d
      path: '/',
      httpOnly: true

    }).json({ success: true, message: "You have successfully logged in!"});

  })(req, res, next);
});

router.post('/logout', function (req, res) {
  if (req.user) {
    res.cookie('auth_token', false, {
      maxAge: 1,
      path: '/'
    });
    res.send('You have successfully logged out');
  } else {
    res.status(400).send('There is no active session');
  }
});

router.get('/get/user/from/cookie', function (req, res) {
  // check for user wich come from middleware
  if (req.user) {
    return res.json(req.user);
  }
  res.json({
    message: 'You better login =)'
  });
});


/*Validate the sign up form*/
function validateSignupForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (!payload.password || !validator.isLength(payload.password, 4)) {
    isFormValid = false;
    errors.password = "Password must have at least 4 characters.";
  }

  if (!payload.name || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

/**
 * Validate the login form*/
function validateLoginForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = "Please provide your email address.";
  }

  if (!payload.password || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}




module.exports = router
