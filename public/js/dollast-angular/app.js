// Generated by LiveScript 1.4.0
(function(){
  var app;
  app = angular.module('dollast-app', ["angular-jwt", "ngRoute", "dollast-msg-center", "dollast-filters", "dollast-user-app", "dollast-site-app", "dollast-prob-app", "dollast-sol-app", "dollast-rnd-app"]);
  app.config([
    "$httpProvider", "jwtInterceptorProvider", function($httpProvider, jwtInterceptorProvider){
      jwtInterceptorProvider.tokenGetter = function(){
        return localStorage.token;
      };
      $httpProvider.interceptors.push([
        "$q", "msgCenter", function($q, msgCenter){
          return {
            response: function(it){
              var that, ref$, info;
              if ((that = (ref$ = it.data) != null ? ref$.status : void 8) != null) {
                info = that;
                if ("object" === typeof info) {
                  msgCenter.push(info);
                } else if ("string" === typeof info) {
                  msgCenter.push({
                    type: "ok",
                    msg: info
                  });
                } else {
                  console.log("bad status returned", info);
                }
              }
              return it;
            },
            responseError: function(rejection){
              var data, i$, len$, part, param, msg;
              if (rejection.status === 400 && "object" === typeof rejection.data) {
                data = rejection.data;
                console.log(data);
                for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
                  part = data[i$];
                  for (param in part) {
                    msg = part[param];
                    msgCenter.push({
                      type: "err",
                      msg: param + ": " + msg
                    });
                  }
                }
              } else if (rejection.status === 401) {
                msgCenter.push({
                  type: "err",
                  msg: "unauthorized. login first. "
                });
              }
              return $q.reject(rejection);
            }
          };
        }
      ]);
      return $httpProvider.interceptors.push('jwtInterceptor');
    }
  ]);
  app.config([
    '$routeProvider', function($routeProvider){
      return $routeProvider.when('/', {
        templateUrl: 'partials/index.html',
        controller: 'index-ctrl'
      }).when('/about', {
        templateUrl: 'partials/about.html'
      }).when('/problem', {
        templateUrl: 'partials/problem/list.html',
        controller: 'prob-list-ctrl'
      }).when('/problem/create', {
        templateUrl: 'partials/problem/modify.html',
        controller: 'prob-modify-ctrl'
      }).when('/problem/:pid', {
        templateUrl: 'partials/problem/show.html',
        controller: 'prob-show-ctrl'
      }).when('/problem/:pid/modify', {
        templateUrl: 'partials/problem/modify.html',
        controller: 'prob-modify-ctrl'
      }).when('/problem/:pid/stat', {
        templateUrl: 'partials/problem/stat.html',
        controller: 'prob-stat-ctrl'
      }).when('/submit/:pid', {
        templateUrl: 'partials/solution/submit.html',
        controller: 'sol-submit-ctrl'
      }).when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'login-ctrl'
      }).when('/solution', {
        templateUrl: 'partials/solution/list.html',
        controller: 'sol-list-ctrl'
      }).when('/solution/user/:uid', {
        templateUrl: 'partials/solution/list.html',
        controller: 'sol-list-ctrl'
      }).when('/solution/:sid', {
        templateUrl: 'partials/solution/show.html',
        controller: 'sol-show-ctrl'
      }).when('/round', {
        templateUrl: 'partials/round/list.html',
        controller: 'rnd-list-ctrl'
      }).when('/round/create', {
        templateUrl: 'partials/round/modify.html',
        controller: 'rnd-modify-ctrl'
      }).when('/round/:rid', {
        templateUrl: 'partials/round/show.html',
        controller: 'rnd-show-ctrl'
      }).when('/round/:rid/modify', {
        templateUrl: 'partials/round/modify.html',
        controller: 'rnd-modify-ctrl'
      }).when('/round/:rid/board', {
        templateUrl: 'partials/round/board.html',
        controller: 'rnd-board-ctrl'
      }).when('/user/register', {
        templateUrl: 'partials/user/register.html',
        controller: 'user-reg-ctrl'
      }).when('/user/:uid', {
        templateUrl: 'partials/user/profile.html',
        controller: 'user-profile-ctrl'
      }).when('/user/:uid/modify', {
        templateUrl: 'partials/user/modify.html',
        controller: 'user-modify-ctrl'
      }).otherwise({
        templateUrl: 'partials/404.html'
      });
    }
  ]);
}).call(this);
