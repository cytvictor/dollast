// Generated by LiveScript 1.4.0
(function(){
  var mongoose, mongooseAutoIncrement, moment, bluebird, conn, makeNextCount, out$ = typeof exports != 'undefined' && exports || this;
  mongoose = require('mongoose');
  mongooseAutoIncrement = require('mongoose-auto-increment');
  moment = require('moment');
  bluebird = require('bluebird');
  out$.conn = conn = mongoose.createConnection('mongodb://localhost/dollast');
  mongooseAutoIncrement.initialize(conn);
  out$.makeNextCount = makeNextCount = function(model, counter){
    counter || (counter = 1);
    return function*(){
      while ((yield model.findById(counter, '_id').lean().exec())) {
        counter += 1;
      }
      return counter;
    };
  };
}).call(this);
