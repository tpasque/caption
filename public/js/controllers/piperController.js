app.controller("piperController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {

  //gets all Users
  posts.getPipers().then(function (users) {
    console.log("this is the users in the userController");
    console.log(users);
    $scope.users = users;
    $scope.piperCount = users.length
  })
}])
