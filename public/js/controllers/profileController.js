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

      if(0 <= user.total_points && user.total_points <= 50){
        $scope.pepper = result[0]
        $scope.next_pepper = result[1]
        $scope.points_needed_next_rank = (result[0].max_points - user.total_points)
      }
      if(51 <= user.total_points && user.total_points <= 100){
        $scope.pepper = result[1]
        $scope.next_pepper = result[2]
        $scope.points_needed_next_rank = (result[1].max_points - user.total_points)
      }
      if(101 <= user.total_points && user.total_points <= 200){
        $scope.pepper = result[2]
        $scope.next_pepper = result[3]
        $scope.points_needed_next_rank = (result[2].max_points - user.total_points)
      }
      if(201 <= user.total_points && user.total_points <= 300){
        $scope.pepper = result[3]
        $scope.next_pepper = result[4]
        $scope.points_needed_next_rank = (result[3].max_points - user.total_points)
      }
      if(301 <= user.total_points && user.total_points <= 400){
        $scope.pepper = result[4]
        $scope.next_pepper = result[5]
        $scope.points_needed_next_rank = (result[4].max_points - user.total_points)
      }
      if(401 <= user.total_points && user.total_points <= 500){
        $scope.pepper = result[5]
        $scope.next_pepper = result[6]
        $scope.points_needed_next_rank = (result[5].max_points - user.total_points)
      }
      if(501 <= user.total_points && user.total_points <= 650){
        $scope.pepper = result[6]
        $scope.next_pepper = result[7]
        $scope.points_needed_next_rank = (result[6].max_points - user.total_points)
      }
      if(651 <= user.total_points && user.total_points <= 800){
        $scope.pepper = result[7]
        $scope.next_pepper = result[8]
        $scope.points_needed_next_rank = (result[7].max_points - user.total_points)
      }
      if(801 <= user.total_points && user.total_points <= 100000){
        $scope.pepper = result[8]
        $scope.next_pepper = result[8]
        $scope.points_needed_next_rank = (result[8].max_points - user.total_points)
      }
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
