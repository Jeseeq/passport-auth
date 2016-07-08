"use strict"
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  email: { type: String, index: { unique: true }},
  name: String,
  password: String
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function(next) {
  let user = this;

  // proceed if user is new
  if (!user.isModified('password')) return next();


  bcrypt.genSalt(function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

UserSchema.plugin(timestamps);
module.exports = mongoose.model('User', UserSchema);
