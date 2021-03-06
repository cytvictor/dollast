// Generated by LiveScript 1.4.0
(function(){
  var mongoose, debug, bcrypt, difference, conn, db, log, schema, model, query, show, modify, register, profile, getPrivileges, out$ = typeof exports != 'undefined' && exports || this;
  mongoose = require('mongoose');
  debug = require('debug');
  bcrypt = require('bcrypt');
  difference = require('prelude-ls').difference;
  conn = require('./conn');
  db = require('../db');
  log = debug("dollast:user");
  schema = new mongoose.Schema({
    _id: String,
    pswd: String,
    desc: String,
    register: Date,
    groups: [String]
  });
  schema.methods.checkPassword = function(candidate){
    return bcrypt.compareSync(candidate, this.pswd);
  };
  model = conn.conn.model('user', schema);
  out$.query = query = function*(uid, pswd){
    var usr;
    usr = (yield model.findById(uid).exec());
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
    return (yield model.findById(uid, "-pswd").exec());
  };
  out$.modify = modify = function*(user){
    var doc, privDiff;
    if (user._id !== this.getCurrentUser()._id) {
      this.acquirePrivilege('user-all');
    }
    doc = (yield model.findById(user._id).exec());
    if (!doc) {
      this['throw']("no such user exists");
    }
    privDiff = difference(doc != null ? doc.groups : void 8, user != null ? user.groups : void 8);
    log(doc != null ? doc.groups : void 8, user != null ? user.groups : void 8);
    if (privDiff != null && privDiff.length > 0) {
      this.acquirePrivilege('user-all');
    }
    import$(doc, user);
    return (yield doc.save());
  };
  out$.register = register = function*(user){
    var exists, salt;
    log({
      user: user
    });
    exists = (yield model.findById(user._id, '_id').lean().exec());
    if (exists) {
      log("here", old);
      return {
        type: 'register',
        error: true,
        payload: "duplicate user id"
      };
    }
    user.groups = [];
    user = new model(user);
    salt = bcrypt.genSaltSync(bcrypt.bcryptCost);
    user.pswd = bcrypt.hashSync(user.pswd, salt);
    (yield user.save());
    return {
      type: 'register',
      payload: "register successful"
    };
  };
  out$.profile = profile = function*(uid){
    var profile, solvedProblems, ownedProblems, ownedRounds;
    profile = (yield model.findById(uid, '-pswd').lean().exec());
    solvedProblems = (yield db.sol.getUserSolvedProblems(uid));
    ownedProblems = (yield db.prob.getUserOwnedProblems(uid));
    ownedRounds = (yield db.rnd.getUserOwnedRounds(uid));
    return {
      profile: profile,
      solvedProblems: solvedProblems,
      ownedProblems: ownedProblems,
      ownedRounds: ownedRounds
    };
  };
  out$.getPrivileges = getPrivileges = function*(uid){
    var user;
    user = (yield model.findById(uid, 'groups').lean().exec());
    return user;
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
