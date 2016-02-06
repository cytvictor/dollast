// Generated by LiveScript 1.4.0
(function(){
  var co, createAction, auth, request, toServerFmt, log, setJwt, onLoadFromToken, fetch, send, onLogin, onSetUi, onRegister, onLogout, onUpdateProblem, onRefreshProblemList, onGetProblem, onSubmitSolution, onGetSolutionsList, onGetSolution, onGetRound, onUploadFiles, onAddProbToRound, onRoundModify, onGetRoundsList, onGetRoundBoard, onUpdateUser, onRepairProblem, onGetProblemStat, onGetUserProfile, out$ = typeof exports != 'undefined' && exports || this;
  co = require('co');
  createAction = require('redux-actions').createAction;
  auth = require('../utils/auth');
  request = require('../utils/request');
  toServerFmt = require('../components/utils').toServerFmt;
  log = debug('dollast:action');
  setJwt = function(token){
    return request.setHeaders({
      Authorization: "Bearer " + token
    });
  };
  out$.onLoadFromToken = onLoadFromToken = createAction('load-from-token', function(token){
    var payload, clientInfo, e;
    if (token) {
      try {
        payload = auth.jwt.dec(token);
        clientInfo = JSON.parse(payload.client);
        setJwt(token);
        return token;
      } catch (e$) {
        e = e$;
        return new Error("invalid token: " + token + ". error message: " + e.message);
      }
    } else {
      return new Error("no given token");
    }
  });
  out$.fetch = fetch = function(endpoint){
    return co.wrap(function*(dispatch){
      var data;
      dispatch({
        type: 'loading',
        payload: endpoint + "/get"
      });
      data = (yield request('get', endpoint).end());
      return dispatch({
        type: 'fetch',
        payload: {
          endpoint: endpoint,
          body: data.body
        }
      });
    });
  };
  out$.send = send = function(endpoint, info){
    return co.wrap(function*(dispatch){
      var data;
      dispatch({
        type: 'loading',
        payload: endpoint + "/post"
      });
      data = (yield request('post', endpoint).send(info).end());
      return dispatch({
        type: 'send',
        payload: {
          endpoint: endpoint,
          body: data.body
        }
      });
    });
  };
  out$.onLogin = onLogin = function(info){
    return co.wrap(function*(dispatch, getState){
      var thunk, token;
      thunk = send('/site/login', info);
      (yield thunk(dispatch));
      token = getState().getIn(['db', 'site', 'login', 'post', 'payload', 'token']);
      return dispatch(onLoadFromToken(token));
    });
  };
  out$.onSetUi = onSetUi = function(endpoint, data){
    return {
      type: 'ui',
      payload: {
        endpoint: endpoint,
        data: data
      }
    };
  };
  out$.onRegister = onRegister = function(info){
    return send('/user/register', info);
  };
  out$.onLogout = onLogout = createAction('logout', function(){
    delete localStorage.token;
    setJwt("");
    return null;
  });
  out$.onUpdateProblem = onUpdateProblem = function(pid, info){
    info = toServerFmt(info);
    log('update problem', info);
    return send("/problem/" + pid, info);
  };
  out$.onRefreshProblemList = onRefreshProblemList = function(){
    return fetch('/problem');
  };
  out$.onGetProblem = onGetProblem = function(pid){
    return fetch("/problem/" + pid);
  };
  out$.onSubmitSolution = onSubmitSolution = function(data){
    return send('/solution/submit', data);
  };
  out$.onGetSolutionsList = onGetSolutionsList = function(){
    return fetch('/solution');
  };
  out$.onGetSolution = onGetSolution = function(sid){
    return fetch("/solution/" + sid);
  };
  out$.onGetRound = onGetRound = function(rid){
    return fetch("/round/" + rid);
  };
  out$.onUploadFiles = onUploadFiles = co.wrap(function*(pid, files){
    var req, i$, len$, f, data;
    log({
      files: files
    });
    req = request('post', "/data/" + pid + "/upload");
    for (i$ = 0, len$ = files.length; i$ < len$; ++i$) {
      f = files[i$];
      req.attach(f.name, f);
    }
    data = (yield req.end());
    return {
      type: 'problem/upload',
      payload: (yield* (function*(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = files).length; i$ < len$; ++i$) {
          f = ref$[i$];
          results$.push(f.name);
        }
        return results$;
      }()))
    };
  });
  out$.onAddProbToRound = onAddProbToRound = function(pid){
    return fetch("/problem/" + pid + "/brief");
  };
  out$.onRoundModify = onRoundModify = function(rnd){
    return send("/round/" + rnd.rid, rnd);
  };
  out$.onGetRoundsList = onGetRoundsList = function(){
    return fetch('/round');
  };
  out$.onGetRoundBoard = onGetRoundBoard = function(rid){
    return fetch("/round/" + rid + "/board");
  };
  out$.onUpdateUser = onUpdateUser = function(uid, updated){
    return send("/user/" + uid, updated);
  };
  out$.onRepairProblem = onRepairProblem = function(pid){
    return fetch("/problem/" + pid + "/repair");
  };
  out$.onGetProblemStat = onGetProblemStat = function(pid){
    return fetch("/problem/" + pid + "/stat");
  };
  out$.onGetUserProfile = onGetUserProfile = function(uid){
    return fetch("/user/" + uid);
  };
}).call(this);
