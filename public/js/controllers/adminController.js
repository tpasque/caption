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
    $scope.brands = brands
    $scope.brandCount = brands.length
  })



  posts.getDashBoardInfo().then(function (info) {

    var pipers = info.users.length
    var posts = info.posts.length
    var brands = info.brands.length
    var captions = info.captions.length
    //charts - javascript
    $(function () {
      $('#adminViewControlContainer').highcharts({
        title: {
          text: 'Piper Admin Dashboard'
        },
        xAxis: {
          categories: ['Pipers', 'Brands', 'Posts', 'Captions']
        },
        labels: {
          items: [{
            html: 'Piper Data',
            style: {
              left: '50px',
              top: '18px',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
          }]
        },
        series: [{
          type: 'column',
          name: 'Pipers',
          data: [pipers,0,0,0]
        }, {
          type: 'column',
          name: 'Brands',
          data: [0,brands,0,0]
        }, {
          type: 'column',
          name: 'Posts',
          data: [0, 0, posts, 0]
        },{
          type: 'column',
          name: 'Captions',
          data: [0, 0, 0, captions]
        },{
          type: 'spline',
          name: 'Average',
          data: [pipers, brands, posts, captions, 0],
          marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
          }
        }, {
          type: 'pie',
          name: 'Total consumption',
          data: [{
            name: 'Pipers',
            y: pipers,
            color: Highcharts.getOptions().colors[0] // Jane's color
          }, {
            name: 'Brands',
            y: brands,
            color: Highcharts.getOptions().colors[1] // John's color
          }, {
            name: 'Posts',
            y: posts,
            color: Highcharts.getOptions().colors[2] // Joe's color
          }, {
            name: 'Captions',
            y: captions,
            color: Highcharts.getOptions().colors[3] // Joe's color
          }],
          center: [100, 80],
          size: 100,
          showInLegend: false,
          dataLabels: {
            enabled: false
          }
        }]
      });
    });
  });


}])
