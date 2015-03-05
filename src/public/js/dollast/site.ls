app = angular.module 'dollast-site-app', ["dollast-crud", "angular-jwt"]

app.controller 'navbar-ctrl', [
  "$scope", "jwtHelper",
  ($scope, jwt-helper) ->
    $scope.load-token = ->
      token = local-storage.token
      return if not token
      payload = jwt-helper.decode-token token
      console.log payload
      $scope.uid = payload._id
    $scope.logout = ->
      delete local-storage.token
      delete $scope.uid
    $scope.load-token!
]

app.controller 'index-ctrl', [
  "$scope", "site-serv", "$location"
  ($scope, site-serv, $location) ->
]

app.controller 'login-ctrl', [
  "$scope", "site-serv"
  ($scope, site-serv) ->
    $scope.submit = (user) ->
      site-serv.login $scope.user, ->
        console.log it
        $scope.msg = it.status != "OK"
        site-serv.token = it.token
        local-storage.token = it.token
]
