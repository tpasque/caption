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

this.getAllPosts = function () {
  return $http.get('posts').then(function (response) {
    console.log("this is the response in getAllPosts in the main_service: ");
    console.log(response.data);
    return response.data
  })

}

}])
