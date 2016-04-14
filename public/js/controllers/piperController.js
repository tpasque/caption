app.controller("piperController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {

  //gets all Users
  posts.getPipers().then(function (users) {
    $scope.users = users;
    $scope.piperCount = users.length
  })
}])
