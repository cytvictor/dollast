// Generated by LiveScript 1.3.1
(function(){
  var db, ref$, out$ = typeof exports != 'undefined' && exports || this;
  db = require('../db');
  ref$ = out$;
  ref$.list = function*(){
    this.body = yield db.rnd.list();
  };
  ref$.nextCount = function*(){
    this.acquirePrivilege('login');
    this.body = {
      _id: yield db.rnd.nextCount()
    };
  };
  ref$.show = function*(){
    this.body = yield db.rnd.show(this.params.rid, {
      mode: "view"
    });
  };
  ref$.save = function*(){
    this.acquirePrivilege('login');
    yield db.rnd.modify(this.params.rid, this.request.body);
    this.body = {
      status: {
        type: "ok",
        msg: "round saved"
      }
    };
  };
  ref$.total = function*(){
    this.acquirePrivilege('login');
    this.body = yield db.rnd.show(this.params.rid, {
      mode: "total"
    });
  };
  ref$['delete'] = function*(){
    this.acquirePrivilege('login');
    yield db.rnd['delete'](this.params.rid);
    this.body = {
      status: {
        type: "ok",
        msg: "round has been deleted"
      }
    };
  };
  ref$.board = function*(){
    var rid;
    rid = this.params.rid;
    this.body = yield db.rnd.board(rid);
  };
  ref$.publish = function*(){
    var rid;
    this.acquirePrivilege('login');
    rid = this.params.rid;
    this.body = yield db.rnd.publish(rid);
  };
}).call(this);