// Generated by LiveScript 1.3.1
(function(){
  var db, salt, config, debug, log, ref$, out$ = typeof exports != 'undefined' && exports || this;
  db = require('../db');
  salt = require('../salt');
  config = require('../config');
  debug = require('debug');
  log = debug('dollast:ctrl:user');
  ref$ = out$;
  ref$.save = function*(){
    this.acquirePrivilege('login');
    this.checkBody('_id').len(config.uidMinLen, config.uidMaxLen);
    delete this.request.body.pswd;
    if (this.errors) {
      return;
    }
    yield db.user.modify(this.request.body);
    this.body = {
      status: {
        type: "ok",
        msg: "user profile saved"
      }
    };
  };
  ref$.register = function*(){
    var uid;
    uid = this.request.body.uid;
    this.body = yield db.user.register({
      _id: uid,
      pswd: this.request.body.pswd
    });
  };
  ref$.profile = function*(){
    this.body = yield db.user.profile(this.params.uid);
  };
}).call(this);