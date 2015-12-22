// Generated by LiveScript 1.3.1
(function(){
  var db, debug, log, ref$, out$ = typeof exports != 'undefined' && exports || this;
  db = require('../db');
  debug = require('debug');
  log = debug('dollast:ctrl:sol');
  ref$ = out$;
  ref$.submit = function*(){
    var uid;
    this.acquirePrivilege('login');
    this.checkBody('pid').toInt();
    this.checkBody('lang')['in'](['cpp', 'java']);
    this.checkBody('code').len(1, 50000);
    if (this.errors) {
      return;
    }
    uid = this.state.user.client.uid;
    log({
      uid: uid
    });
    yield db.sol.submit(this.request.body, uid);
    this.body = {
      status: {
        type: "ok",
        msg: "solution submited successfully"
      }
    };
  };
  ref$.list = function*(){
    this.body = yield db.sol.list(this.query);
  };
  ref$.show = function*(){
    this.acquirePrivilege('login');
    this.body = yield db.sol.show(this.params.sid);
  };
  ref$.toggle = function*(){
    this.acquirePrivilege('login');
    this.body = yield db.sol.toggle(this.params.sid);
    this.body.status = {
      type: "ok",
      msg: "solution toggled"
    };
  };
}).call(this);