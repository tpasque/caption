var app = angular.module("captionApp", ['ngRoute', 'ngResource', 'satellizer']);

//need a satellizer oauth key with facebook.
//production clientID = x
//development clientID = y


app.config(function ($routeProvider, $authProvider) {

  $authProvider.facebook({

  //client token from Facebook - 69d962997b49f5d1a202ecad3dde8134

    clientId: '1711379399115428',
    scope: ['email'],
    scopeDelimiter: ',',
    profileFields: ['name', 'id', 'picture.type(large)', 'emails'],
    popupOptions: { width: 580, height: 400 }
  });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'mainController'
    })
    .when('/posts',{
      templateUrl: 'partials/posts/index.html',
      controller: 'postController'
    })
    //I used "postController" here and on other paths bc I couldn't get "profileController" to work for some reason...
    //Not sure if there is a problem with repeating controller usage.
    .when('/profile',{
      templateUrl: 'partials/profile/show.html',
      controller: 'postController'
    })
    .when('/admin', {
      templateUrl: 'partials/admin/index.html',
      controller: 'postController'
    })
    .when('/admin/posts/new', {
      templateUrl: 'partials/admin/posts/new.html',
      controller: 'postController'
    })
    .when('/admin/brands/new', {
      templateUrl: 'partials/admin/brands/new.html',
      controller: 'postController'
    })
    .when('/users', {
      templateUrl: 'partials/users/index.html',
      controller: 'postController'
    })
    .when('/admin/brands', {
      templateUrl: 'partials/admin/brands/index.html',
      controller: 'postController'
    })


})
