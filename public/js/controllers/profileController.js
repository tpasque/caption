app.controller("profileController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {
  console.log("you are on the profile controller");
  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
    $scope.userObj = user
    $scope.captionAmount = user.captions.length
    console.log(user);
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

  posts.getAllPosts().then(function (result) {
    $scope.posts = result.data[0].posts;
  })

}]);
