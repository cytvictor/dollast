// Generated by LiveScript 1.4.0
(function(){
  var co, debug, config, sol, rnd, prob, user, canAccess, log, bindCtx, out$ = typeof exports != 'undefined' && exports || this;
  co = require('co');
  debug = require('debug');
  config = require('./config');
  sol = require('./models/sol');
  rnd = require('./models/rnd');
  prob = require('./models/prob');
  user = require('./models/user');
  canAccess = require('./models/permit').canAccess;
  log = debug('dollast:db');
  out$.sol = sol;
  out$.rnd = rnd;
  out$.prob = prob;
  out$.user = user;
  out$.bindCtx = bindCtx = function(ctx){
    var i$, ref$, len$, obj, results$ = [], this$ = this;
    ctx.acquirePrivilege = function(priv){
      var i$, ref$, len$, ids, results$ = [];
      log("checking privilege: " + priv, ctx.state.user.priv);
      for (i$ = 0, len$ = (ref$ = priv.split(" ")).length; i$ < len$; ++i$) {
        ids = ref$[i$];
        if (config.mode !== "debug" && !ctx.state.user.priv[priv]) {
          throw new Error("failure on privilege checking, " + priv + " required. ");
        }
      }
      return results$;
    };
    ctx.ensureAccess = co.wrap(function*(model, id, action){
      var resource;
      resource = (yield model.findById(_id, 'permit').lean().exec());
      log("asking for permissions " + resource.permit + " in " + ctx.state.user + " with action " + action);
      if (!canAccess(ctx.state.suer, resource.permit, action)) {
        throw new Error("error checking permissions");
      }
    });
    for (i$ = 0, len$ = (ref$ = [sol, rnd, prob, user]).length; i$ < len$; ++i$) {
      obj = ref$[i$];
      obj.getCurrentUser = fn$;
      obj.acquirePrivilege = ctx.acquirePrivilege;
      obj.ensureAccess = ctx.ensureAccess;
      results$.push(obj['throw'] = ctx['throw']);
    }
    return results$;
    function fn$(){
      return ctx.state.user;
    }
  };
}).call(this);
