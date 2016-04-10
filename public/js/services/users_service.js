app.service('users', ['$http', function ($http) {
  this.getAllUsers = function () {
    return $http.get('users').then(function (response) {
      return response
    })
  }

}])
