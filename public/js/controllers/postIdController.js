app.controller("postIdController", ['$scope', '$http', '$auth', '$location', '$route', '$routeParams', 'posts', function ($scope, $http, $auth, $location, $route, $routeParams, posts) {

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
  posts.getUserData().then(function(payload){
    $scope.userData = payload;
    if ($scope.userData['is_admin'] === true) {
    $scope.isAdmin = true;
    } else {
    $scope.isAdmin = false;
    }
  })

  var post_id = $routeParams.id


  posts.getPostById(post_id).then(function (response) {
    $scope.post = response[0].post.post
    $scope.brand = response[0].post.brands[0]
    $scope.captions = response[0].post.captions
  })

}])
