// Generated by LiveScript 1.3.1
(function(){
  var koa, koaJson, koaStatic, koaBodyparser, koaConditionalGet, koaValidate, koaRouter, koaSend, koaEtag, koaJwt, util, path, fs, debug, _, config, db, crypt, app, log, routers, port, out$ = typeof exports != 'undefined' && exports || this;
  koa = require('koa');
  koaJson = require('koa-json');
  koaStatic = require('koa-static');
  koaBodyparser = require('koa-bodyparser');
  koaConditionalGet = require('koa-conditional-get');
  koaValidate = require('koa-validate');
  koaRouter = require('koa-router');
  koaSend = require('koa-send');
  koaEtag = require('koa-etag');
  koaJwt = require('koa-jwt');
  util = require('util');
  path = require('path');
  fs = require('fs');
  debug = require('debug');
  _ = require('prelude-ls');
  config = require('./config');
  db = require('./db');
  crypt = require('./crypt');
  out$.app = app = koa();
  log = debug('dollast:server');
  if (!db) {
    log("No Database found");
  }
  app.use(koaConditionalGet());
  app.use(koaEtag());
  app.use(koaJson());
  app.use(koaValidate());
  app.use(koaJwt({
    secret: config.jwtKey,
    passthrough: true
  }));
  app.keys = config.keys;
  app.use(function*(next){
    yield next;
  });
  app.use(koaBodyparser({
    extendTypes: {
      json: ['application/x-javascript'],
      multipart: ['multipart/form-data']
    }
  }));
  app.use(function*(next){
    var e;
    try {
      log(this.req.method + " " + this.req.url);
      yield next;
    } catch (e$) {
      e = e$;
      log("catched error:");
      log(e);
      this.status = e.status || 200;
      this.body = {
        type: 'internal error',
        payload: {
          message: e.message
        },
        error: true
      };
    }
    if (this.errors) {
      this.status = 200;
      this.body = {
        type: 'invalid request',
        payload: this.errors,
        error: true
      };
    }
  });
  app.use(function*(next){
    var ref$, ref1$, that, clientState, ref2$, ref3$;
    log('request body', this.request.body);
    log('user state', this.state.user);
    if ((ref$ = this.state) != null && ((ref1$ = ref$.user) != null && ref1$.server)) {
      if (that = this.state.user.client) {
        clientState = JSON.parse(that);
        log("client info", clientState);
      } else {
        clientState = {};
      }
      this.state.user = JSON.parse((ref2$ = this.state) != null ? (ref3$ = ref2$.user) != null ? ref3$.server : void 8 : void 8);
      this.state.user.client = clientState;
      log('encrypted data in header.server', this.state.user);
    } else {
      (this.state || (this.state = {})).user = {};
    }
    yield next;
  });
  app.use(function*(next){
    this.check = function(obj, key, errMsg){
      if (!obj) {
        if (!this.errors) {
          this.errors = [];
        }
        this.errors.push(errMsg + "");
        return new koaValidate.Validator(this, null, null, false, null, false);
      } else {
        return new koaValidate.Validator(this, key, obj[key], obj[key] != null, obj);
      }
    };
    yield next;
  });
  app.use(function*(next){
    var ref$, i$, len$, folders;
    db.bindCtx(this);
    (ref$ = this.state.user).theme || (ref$.theme = config['default'].theme);
    (ref$ = this.state.user).priv || (ref$.priv = config['default'].priv);
    if ((ref$ = this.method) === 'HEAD' || ref$ === 'GET') {
      for (i$ = 0, len$ = (ref$ = ["public", "theme/" + this.state.user.theme]).length; i$ < len$; ++i$) {
        folders = ref$[i$];
        if (yield koaSend(this, this.path, {
          index: 'index.html',
          maxAge: 864000000,
          root: path.resolve(folders)
        })) {
          return;
        }
      }
    }
    yield next;
  });
  routers = require('./routers');
  app.use(routers.router);
  port = process.env.PORT || 3000;
  console.log("Listening port " + port);
  app.listen(port);
}).call(this);
