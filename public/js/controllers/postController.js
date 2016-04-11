app.controller("postController", ['$scope', '$http', '$auth', '$location', '$route', '$routeParams', 'posts', function ($scope, $http, $auth, $location, $route, $routeParams, posts) {

  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
    $scope.userObj = user
  })

  //checks to see if logged in user has is_admin set to true or false, the sets isAdmin to that value
  $scope.userData;
  $scope.isAdmin;
  // console.log($scope.isAdmin);
  posts.getUserData().then(function(payload){
    console.log("payload");
    console.log(payload);
    $scope.userData = payload;
    console.log("scope.userData");
    console.log($scope.userData);
    if ($scope.userData.is_admin === true) {
    $scope.isAdmin = true;
    } else {
    $scope.isAdmin = false;
    }
  })

  //gets all posts for post index page
  posts.getAllPosts().then(function (result) {
    $scope.posts = result.data[0].posts;
  })

  // $scope.submitVote = function () {
  //
  // }

}])
