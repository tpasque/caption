var app = angular.module("captionApp", ['ngRoute', 'ngResource', 'satellizer']);

//need a satellizer oauth key with facebook.
//production clientID = x
//development clientID = y


app.config(function ($routeProvider, $authProvider) {

  $routeProvider
    .when('/', {
          templateUrl: 'partials/home.html',
          controller: 'mainController'
        })

})
