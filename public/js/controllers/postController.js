app.controller("postController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {
  posts.getUserData().then(function (user) {
    console.log("#######");
    console.log(user);
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
    console.log("this is the $scope.user: "+$scope.user);
    // console.log($scope.userAdmin);
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
