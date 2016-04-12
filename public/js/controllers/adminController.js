app.controller("adminController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {
  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user_facebook_id = user.facebook_id
    $scope.userObj = user
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

  posts.getBrands().then(function (brands) {
    console.log("this is the brands in the admin controller");
    console.log(brands);
    $scope.brands = brands
    $scope.brandCount = brands.length
  })

}])
