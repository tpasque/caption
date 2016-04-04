app.service('posts', ['$http', function ($http) {

this.getUserData = function(){

var token = localStorage.getItem('satellizer_token')
var data = JSON.stringify({token : token})
console.log("data on main_service with JSON token "+data);
  return $http.post('user', data).then(function(response){
  return response.data
  })
};

this.isLoggedIn = function () {
  var token = localStorage.getItem('satellizer_token')
  return token ? true : false;
}

}])
