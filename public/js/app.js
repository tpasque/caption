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
    .when('/posts/:id', {
      templateUrl: 'partials/posts/show.html',
      controller: 'postIdController'
    })
    .when('/profile',{
      templateUrl: 'partials/profile/show.html',
      controller: 'profileController'
    })
    .when('/admin', {
      templateUrl: 'partials/admin/index.html',
      controller: 'adminController'
    })
    .when('/admin/posts/new', {
      templateUrl: 'partials/admin/posts/new.html',
      controller: 'adminController'
    })
    .when('/admin/brands/new', {
      templateUrl: 'partials/admin/brands/new.html',
      controller: 'adminController'
    })
    .when('/pipers', {
      templateUrl: 'partials/users/index.html',
      controller: 'piperController'
    })
    .when('/admin/brands', {
      templateUrl: 'partials/admin/brands/index.html',
      controller: 'adminController'
    })
    .when('/admin/posts', {
      templateUrl: 'partials/admin/posts/index.html',
      controller: 'adminController'
    })
    .when('/payments', {
      templateUrl: 'partials/admin/payments/index.html',
      controller: 'paymentController'
    })
    .when('/toppipers', {
      templateUrl: 'partials/users/toppipers.html',
      controller: 'piperController'
    })



})
