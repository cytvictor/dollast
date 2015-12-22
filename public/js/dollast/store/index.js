// Generated by LiveScript 1.3.1
(function(){
  var co, ref$, createStore, applyMiddleware, compose, reduxThunk, createLogger, rootReducer, persistState, devtools, I, log, errorMiddleware, configureStore, out$ = typeof exports != 'undefined' && exports || this;
  co = require('co');
  ref$ = require('redux'), createStore = ref$.createStore, applyMiddleware = ref$.applyMiddleware, compose = ref$.compose;
  reduxThunk = require('redux-thunk');
  createLogger = require('redux-logger');
  rootReducer = require('../reducers').rootReducer;
  persistState = require('redux-devtools').persistState;
  devtools = require('../components/devtools');
  I = require('immutable');
  log = debug('dollast:store');
  errorMiddleware = function(store){
    var dispatch, getState;
    dispatch = store.dispatch;
    getState = store.getState;
    return function(next){
      return function(action){
        var addJwt, payload, ref$, e;
        if (action instanceof Promise) {
          co(function*(){
            var data;
            data = yield action;
            dispatch(data);
          });
          return;
        }
        if (action instanceof Function) {
          addJwt = function(request){
            var token;
            token = getState().getIn(['session', 'token'], null);
            if (token) {
              return request = request.set('Authorization', "Bearer " + token);
            }
          };
          action(addJwt, dispatch, getState);
          return;
        }
        payload = action.payload;
        if (payload instanceof Error) {
          action.error = true;
          return;
        }
        if ((payload != null ? (ref$ = payload.constructor) != null ? ref$.name : void 8 : void 8) === 'Response') {
          action.payload = action.payload.body;
        }
        try {
          return next(action);
        } catch (e$) {
          e = e$;
          return log(e);
        }
      };
    };
  };
  out$.configureStore = configureStore = function(initState){
    var logger, finalCreateStore, store;
    logger = createLogger({
      stateTransformer: function(state){
        return I.fromJS(state).toJS();
      }
    });
    finalCreateStore = compose(applyMiddleware(errorMiddleware, logger), devtools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
    return store = finalCreateStore(createStore)(rootReducer, initState);
  };
}).call(this);