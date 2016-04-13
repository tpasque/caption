app.controller("postController", ['$scope', '$http', '$auth', '$location', '$route', '$routeParams', 'posts', function ($scope, $http, $auth, $location, $route, $routeParams, posts) {

  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
    $scope.userObj = user
    // console.log(user);
  })



  //gets all posts for post index page
  posts.getAllPosts().then(function (result) {
    $scope.posts = result.data[0].posts;
  })




}])
