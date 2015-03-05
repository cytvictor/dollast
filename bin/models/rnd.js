// Generated by LiveScript 1.3.1
var mongoose, moment, debug, conn, log, schema, model, out$ = typeof exports != 'undefined' && exports || this, this$ = this;
mongoose = require('mongoose');
moment = require('moment');
debug = require('debug');
conn = require('./conn');
log = debug("rnd-model");
schema = new mongoose.Schema({
  _id: Number,
  title: String,
  begTime: Date,
  endTime: Date,
  probs: [{
    type: Number,
    ref: "problem"
  }]
});
model = conn.conn.model('round', schema);
import$(out$, {
  modify: function*(rid, rnd){
    var that;
    if (that = rnd.begTime) {
      rnd.begTime = new Date(that);
    }
    if (that = rnd.endTime) {
      rnd.endTime = new Date(that);
    }
    return yield model.update({
      _id: rid
    }, {
      $set: rnd
    }, {
      upsert: true,
      overwrite: true
    }).exec();
  },
  show: function*(rid, opts){
    var rnd, started;
    opts == null && (opts = {});
    opts.mode || (opts.mode = "view");
    rnd = yield model.findById(rid).populate('probs', '_id outlook.title').lean().exec();
    if (opts.mode === "view" && moment().isBefore(rnd.begTime)) {
      rnd.probs = [];
      started = false;
    } else {
      started = true;
    }
    return {
      rnd: rnd,
      started: started
    };
  },
  list: function*(){
    return yield model.find({}, '_id title').lean().exec();
  },
  'delete': function*(rid){
    return yield model.findByIdAndRemove(rid).lean().exec();
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}