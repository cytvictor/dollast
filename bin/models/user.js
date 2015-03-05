// Generated by LiveScript 1.3.1
var mongoose, debug, bcrypt, conn, config, log, schema, model, out$ = typeof exports != 'undefined' && exports || this;
mongoose = require('mongoose');
debug = require('debug');
bcrypt = require('bcrypt');
conn = require('./conn');
config = require('../config');
log = debug("user-model");
schema = new mongoose.Schema({
  _id: String,
  pswd: String,
  privList: [String]
});
schema.methods.checkPassword = function(candidate){
  return bcrypt.compareSync(candidate, this.pswd);
};
model = conn.conn.model('user', schema);
import$(out$, {
  query: function*(user){
    var usr;
    usr = yield model.findById(user._id).exec();
    if (!usr || !usr.checkPassword(user.pswd)) {
      return null;
    }
    return usr;
  },
  show: function*(uid){
    this.acquirePrivilege('user-all');
    log("uid: " + uid);
    return yield model.findById(uid, "privList").exec();
  },
  modify: function*(user){
    if (user._id !== this.getCurrentUser._id) {
      this.acquirePrivilege('user-all');
    }
    return yield model.update({
      _id: user._id
    }, {
      $set: user
    }, {
      upsert: true,
      overwrite: true
    }).exec();
  },
  register: function*(user){
    user.privList = [''];
    user = new model(user);
    user.pswd = bcrypt.hashSync(user.pswd, config.bcryptCost);
    yield user.save();
    return "OK";
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}