app.controller("paymentController", ['$scope', '$http', '$auth', '$location', '$route', '$routeParams', 'posts', function ($scope, $http, $auth, $location, $route, $routeParams, posts) {
  posts.getPaymentInfo().then(function (payment_info) {
    console.log("payment info in the payment controller");
    console.log(payment_info);
    $scope.payments = payment_info
      })

      //render today's date
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      }

      if(mm<10) {
          mm='0'+mm
      }

      today = mm+'/'+dd+'/'+yyyy;
      $scope.date = today

}])
