// Generated by LiveScript 1.3.1
var app;
app = angular.module('dollast-site-app', ["dollast-crud"]);
app.controller('navbar-ctrl', [
  "$scope", "site-serv", function($scope, siteServ){
    return $scope.users = siteServ.get({
      mode: 'session'
    });
  }
]);
app.controller('index-ctrl', ["$scope", "site-serv", "$location", function($scope, siteServ, $location){}]);
app.controller('login-ctrl', [
  "$scope", "site-serv", function($scope, siteServ){
    return $scope.submit = function(user){
      return siteServ.login($scope.user, function(it){
        return $scope.msg = it.status === false;
      });
    };
  }
]);