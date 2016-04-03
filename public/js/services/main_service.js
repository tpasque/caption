app.service('posts', ['$http', function ($http) {

this.getUserData = function(){

var token = localStorage.getItem('satellizer_token')
var data = JSON.stringify({token : token})
  return $http.post('user', data).then(function(response){
  return response.data
  })
};

this.isLoggedIn = function () {
  var token = localStorage.getItem('satellizer_token')
  return token ? true : false;
}

}])
