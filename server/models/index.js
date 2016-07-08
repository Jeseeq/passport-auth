const mongoose = require('mongoose');

module.exports= function(config) {

  // connect to the database
  console.log(config)
  mongoose.connect(config.db, function(err) {
    if (err) { throw err; }
  });

  // loading models
  require('./user');
};
