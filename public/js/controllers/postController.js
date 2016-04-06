app.controller("postController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {
  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
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
    console.log("this is the result for getAllPosts in the postController");
    console.log(result.data[0].posts);
    $scope.posts = result.data[0].posts;
    console.log("$scope.posts");
    console.log($scope.posts);
  })


//   posts.allUser().then(function(result){
//     $scope.userStats = result;
//
//   })
//
//
// posts.showPost().then(function(result){
//   $scope.showPost = result;

// })
}])
