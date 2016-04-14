app.controller("profileController", ['$scope', '$http', '$auth', '$location', '$route', 'posts', function ($scope, $http, $auth, $location, $route, posts) {
  console.log("you are on the profile controller");
  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.userAgency = user.is_agency
    $scope.piper = user.is_piper
    $scope.user = user.facebook_id
    $scope.userObj = user
    $scope.captionAmount = user.captions.length
    console.log(user);

    posts.getPeppers().then(function (result) {

      if(0 <= user.total_points && user.total_points <= 50){
        $scope.pepper = result[0]
        $scope.next_pepper = result[1]
        $scope.points_needed_next_rank = (result[0].max_points - user.total_points)
      }
      if(51 <= user.total_points && user.total_points <= 100){
        $scope.pepper = result[1]
        $scope.next_pepper = result[2]
        $scope.points_needed_next_rank = (result[1].max_points - user.total_points)
      }
      if(101 <= user.total_points && user.total_points <= 200){
        $scope.pepper = result[2]
        $scope.next_pepper = result[3]
        $scope.points_needed_next_rank = (result[2].max_points - user.total_points)
      }
      if(201 <= user.total_points && user.total_points <= 300){
        $scope.pepper = result[3]
        $scope.next_pepper = result[4]
        $scope.points_needed_next_rank = (result[3].max_points - user.total_points)
      }
      if(301 <= user.total_points && user.total_points <= 400){
        $scope.pepper = result[4]
        $scope.next_pepper = result[5]
        $scope.points_needed_next_rank = (result[4].max_points - user.total_points)
      }
      if(401 <= user.total_points && user.total_points <= 500){
        $scope.pepper = result[5]
        $scope.next_pepper = result[6]
        $scope.points_needed_next_rank = (result[5].max_points - user.total_points)
      }
      if(501 <= user.total_points && user.total_points <= 650){
        $scope.pepper = result[6]
        $scope.next_pepper = result[7]
        $scope.points_needed_next_rank = (result[6].max_points - user.total_points)
      }
      if(651 <= user.total_points && user.total_points <= 800){
        $scope.pepper = result[7]
        $scope.next_pepper = result[8]
        $scope.points_needed_next_rank = (result[7].max_points - user.total_points)
      }
      if(801 <= user.total_points && user.total_points <= 100000){
        $scope.pepper = result[8]
        $scope.next_pepper = result[8]
        $scope.points_needed_next_rank = (result[8].max_points - user.total_points)
      }

      $(function () {

    // drop in for gages on profile page

    Highcharts.chart('showPageTopCaptionsInfoContainer', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        title: {
            text: 'Piperness',
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 160 - labelWidth / 2,
                    y: 120
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Piperness',
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: (( user.total_points / $scope.pepper.max_points)*100)
            }]
        }, {
            name: 'Comments',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: $scope.captionAmount
            }]
        }, {
            name: 'Points',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '50%',
                innerRadius: '50%',
                y: $scope.userObj.total_points
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });


});
    })
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

  posts.getAllPosts().then(function (result) {
    $scope.posts = result.data[0].posts;
  })

  //animation portion




}]);
