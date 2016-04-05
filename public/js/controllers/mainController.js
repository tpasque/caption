app.controller('mainController', ['$scope', '$location','$auth','$rootScope','posts', function ($scope, $location, $auth, $rootScope, posts) {

  $scope.user = {}

  $scope.userName
  // $scope.loggedIn = false;
  // $scope.logIn = true;
   $scope.login = function() {
     $auth.login($scope.user)
       .then(function() {
         console.log('You have successfully signed in!');
         $location.path('/');
       })
       .catch(function(error) {
         console.log(error.data.message, error.status);
       });
   };
   $scope.authenticate = function(provider) {
     $auth.authenticate(provider)
       .then(function(response) {
         console.log('You have successfully signed in with ' + provider + '!');
         $location.path('/posts')
       })
       .catch(function(error) {
         if (error.error) {
           // Popup error - invalid redirect_uri, pressed cancel button, etc.
           console.log(error.error);
         } else if (error.data) {
           // HTTP response error from server
         console.log(error.data.message, error.status);
         } else {
           console.log(error);
         }
       });
   };
   $scope.logout = function(){
     $auth.logout()
     console.log("successfully logged out!");
   }

  $scope.logout = function(){
    $auth.logout()
    console.log("successfully logged out!");
  }

  $rootScope.$on('$locationChangeSuccess', function(){
      if(localStorage.satellizer_token){
        // $scope.logIn = false;
        $scope.user.session = true;
      }
      else{

       $scope.user.session = false;
     }

  })
  //this checks our $scope on the mainController
  // console.log($scope);
  //this looks to see if the user has been to the site before, and if so, if they are logged in on
  //their social environment (facebook in this case), it converts $scope.user using JSON.stringify
  //to provide information that our application will use for a given user.
  // console.log("Logged in: " + JSON.stringify($scope.user));


  posts.getUserData().then(function (user) {
  $scope.userName = user.first_name
  console.log("username is: " + $scope.userName);
})

}])
