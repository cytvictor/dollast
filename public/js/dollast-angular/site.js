// Generated by LiveScript 1.3.1
(function(){
  var app;
  app = angular.module('dollast-site-app', ["dollast-crud", "angular-jwt"]);
  app.controller('navbar-ctrl', [
    "$scope", "jwtHelper", "user-session", function($scope, jwtHelper, userSession){
      var sess;
      sess = $scope.sess = userSession;
      $scope.loadToken = function(){
        return sess.loadToken();
      };
      $scope.logout = function(){
        return sess.logout();
      };
      return $scope.loadToken();
    }
  ]);
  app.controller('index-ctrl', ["$scope", "site-serv", "$location", function($scope, siteServ, $location){}]);
  app.controller('login-ctrl', [
    "$scope", "site-serv", "user-session", function($scope, siteServ, userSession){
      return $scope.submit = function(user){
        return userSession.login($scope.user._id, $scope.user.pswd);
      };
    }
  ]);
  app.controller('msg-center-ctrl', [
    "$scope", "$timeout", "msgCenter", function($scope, $timeout, msgCenter){
      $scope.shared = {
        messages: [],
        type: ""
      };
      console.log(msgCenter);
      $timeout(function(){
        return msgCenter.load($scope.shared);
      });
      $scope.flip = function(dir){
        msgCenter.shape(dir);
      };
      return $scope.style = function(type){
        switch (type) {
        case "ok":
          return "green";
        case "err":
          return "red";
        default:
          throw Error('unimplemented');
        }
      };
    }
  ]);
}).call(this);
