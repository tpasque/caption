app.controller("userController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', 'users', function ($scope, $http, $auth, $location, $route, posts, users ) {
  console.log("you are on the user controller");
  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user_facebook_id = user.facebook_id
    $scope.userObj = user
  })

  //checks to see if logged in user has is_admin set to true or false, the sets isAdmin to that value
  $scope.userData;
  $scope.isAdmin;
  posts.getUserData().then(function(payload){
    $scope.userData = payload;
    if ($scope.userData['is_admin'] === true) {
    $scope.isAdmin = true;
    } else {
    $scope.isAdmin = false;
    }
  })

  //gets all Users
  users.getAllUsers().then(function (users) {
    console.log("this is the users in the userController");
    console.log(users);
  })

}])
