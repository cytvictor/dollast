// Generated by LiveScript 1.3.1
(function(){
  var combineReducers, handleActions, UPDATE_PATH, I, auth, A, log, initState, loadFromTokenReducer, defaultThrow, useDefaultThrow, reducer, rootReducer, out$ = typeof exports != 'undefined' && exports || this;
  combineReducers = require('redux').combineReducers;
  handleActions = require('redux-actions').handleActions;
  UPDATE_PATH = require('redux-simple-router').UPDATE_PATH;
  I = require('immutable');
  auth = require('../utils/auth');
  A = require('../actions');
  log = debug('dollast:reducers');
  out$.initState = initState = I.fromJS({
    session: {
      guest: true
    }
  });
  loadFromTokenReducer = function(state, action){
    var token, payload, clientInfo;
    token = action.payload;
    payload = auth.jwt.dec(token);
    localStorage.token = token;
    clientInfo = JSON.parse(payload.client);
    return state.set('session', I.fromJS({
      guest: false,
      token: token,
      uid: clientInfo.uid
    }));
  };
  defaultThrow = function(state, action){
    log('error found:', action.payload.message, 'with', {
      state: state,
      action: action
    });
    return state;
  };
  useDefaultThrow = function(next){
    return {
      next: next,
      'throw': defaultThrow
    };
  };
  reducer = handleActions({
    'load-from-token': loadFromTokenReducer,
    'register': useDefaultThrow(function(state, action){
      log('register', {
        action: action
      });
      return state;
    }),
    'login': useDefaultThrow(function(state, action){
      log({
        state: state,
        action: action
      });
      if (action.error) {
        return state;
      } else {
        return loadFromTokenReducer(state, {
          payload: action.payload.token
        });
      }
    }),
    'error': useDefaultThrow(function(state, action){
      return state;
    }),
    'logout': useDefaultThrow(function(state, action){
      return state.set('session', I.fromJS({
        guest: true
      }));
    }),
    'problem/update': useDefaultThrow(function(state, action){
      return state.setIn(['problem', 'update'], I.fromJS(action.payload));
    }),
    'round/add-prob': useDefaultThrow(function(state, action){
      return state.updateIn(['round', 'update', 'probs'], function(probs){
        probs == null && (probs = I.List());
        return probs.push(action.payload);
      });
    }),
    'problem/repair': useDefaultThrow(function(state, action){
      return state.setIn(['problem', 'update', 'config', 'dataset'], I.fromJS(action.payload.payload));
    }),
    'fetch': useDefaultThrow(function(state, action){
      var ref$, endpoint, body, path;
      ref$ = action.payload, endpoint = ref$.endpoint, body = ref$.body;
      endpoint = "db" + endpoint + "/get";
      path = endpoint.split('/');
      return state.setIn(path, I.fromJS(body));
    }),
    'send': useDefaultThrow(function(state, action){
      var ref$, endpoint, body;
      return ref$ = action.payload, endpoint = ref$.endpoint, body = ref$.body, ref$;
    })
  }, initState);
  out$.rootReducer = rootReducer = reducer;
}).call(this);
