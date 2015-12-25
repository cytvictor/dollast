// Generated by LiveScript 1.3.1
(function(){
  var mongoose, debug, bcrypt, _, conn, config, log, schema, model, query, show, modify, register, profile, getPrivileges, out$ = typeof exports != 'undefined' && exports || this;
  mongoose = require('mongoose');
  debug = require('debug');
  bcrypt = require('bcrypt');
  _ = require('prelude-ls');
  conn = require('./conn');
  config = require('../config');
  log = debug("dollast:user");
  schema = new mongoose.Schema({
    _id: String,
    pswd: String,
    desc: String,
    privList: [String]
  });
  schema.methods.checkPassword = function(candidate){
    return bcrypt.compareSync(candidate, this.pswd);
  };
  model = conn.conn.model('user', schema);
  out$.query = query = function*(uid, pswd){
    var usr;
    usr = yield model.findById(uid).exec();
    if (!usr || !usr.checkPassword(pswd)) {
      return null;
    }
    return usr;
  };
  out$.show = show = function*(uid){
    log("uid: " + uid, this.getCurrentUser());
    if (uid !== this.getCurrentUser()._id) {
      this.acquirePrivilege('user-all');
    }
    return yield model.findById(uid, "-pswd").exec();
  };
  out$.modify = modify = function*(user){
    var doc, privDiff;
    if (user._id !== this.getCurrentUser()._id) {
      this.acquirePrivilege('user-all');
    }
    doc = yield model.findById(user._id).exec();
    if (!doc) {
      this['throw']("no such user exists");
    }
    privDiff = _.difference(doc != null ? doc.privList : void 8, user != null ? user.privList : void 8);
    log(doc != null ? doc.privList : void 8, user != null ? user.privList : void 8);
    if (privDiff != null && privDiff.length > 0) {
      this.acquirePrivilege('user-all');
    }
    import$(doc, user);
    yield doc.save();
  };
  out$.register = register = function*(user){
    var old, salt;
    log({
      user: user
    });
    old = yield model.findById(user._id, '_id').lean().exec();
    if (old) {
      log("here", old);
      this['throw']("duplicate user id");
    }
    user.privList = [];
    user = new model(user);
    salt = bcrypt.genSaltSync(bcrypt.bcryptCost);
    user.pswd = bcrypt.hashSync(user.pswd, salt);
    yield user.save();
    return {
      status: {
        type: "ok",
        msg: "register successful"
      }
    };
  };
  out$.profile = profile = function*(uid){
    var user;
    user = yield model.findById(uid, '-pswd').lean().exec();
    return user;
  };
  out$.getPrivileges = getPrivileges = function*(uid){
    var user;
    user = yield model.findById(uid, 'privList').lean().exec();
    return user;
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
