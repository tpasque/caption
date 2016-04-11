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

    posts.getPeppers().then(function (result) {
      $scope.peppers = result
      $scope.bell_pepper = result[0]
      $scope.pimento_pepper = result[1]
      $scope.poblano_pepper = result[2]
      $scope.anaheim_pepper = result[3]
      $scope.jalapeno_pepper = result[4]
      $scope.cayenne_pepper = result[5]
      $scope.habanero_pepper = result[6]
      $scope.ghost_pepper = result[7]
      $scope.scorpion_pepper = result[8]

      $scope.points_needed_next_rank = (result[0].max_points - user.total_points)
    })
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
