'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);

    var uberClientId = 'IuEmQipRiQGncyZ4ySFYz1uKdD-uHLZW';
    var uberServerToken = 'm6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn';

    $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&distance=50&limit=50&api_key=b93c2762033e97bcdf97392e7d0dd42c&format=json')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.shows = data.events.event;
      for (var index = 0; index < $scope.shows.length; index++) {
        // console.log('lastfm geo', $scope.shows[index].venue.location['geo:point']['geo:lat']);

        var eventLatitude = $scope.shows[index].venue.location['geo:point']['geo:lat'],
        eventLongitude = $scope.shows[index].venue.location['geo:point']['geo:long'];
        // debugger;
        $http.get('https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' + eventLatitude + '&end_longitude='+ eventLongitude + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn')
        .success(function(data, status, headers, config) {
          var result = data.prices;
          // console.log(data.['prices']);

          if (typeof result !== typeof undefined) {
            // Sort Uber products by time to the user's location
            result.sort(function(t0, t1) {
              return t0.duration - t1.duration;
            });

            // Update the Uber button with the shortest time
            var shortest = result[0];
            if (typeof shortest !== typeof undefined) {
              console.log('Updating time estimate...');
              $('#time').html('in ' + Math.ceil(shortest.duration / 60.0) + ' min');
            }
          }

        }).error(function(data) {
          console.log('could not load uber');
        });

        $scope.uber = function() {
          var uberURL = 'https://m.uber.com/sign-up?';

          // Add parameters
          uberURL += 'client_id=' + uberClientId;
          if (typeof $scope.coords.latitude !== typeof undefined) uberURL += '&' + 'pickup_latitude=' + $scope.coords.latitude;
          if (typeof $scope.coords.longitude !== typeof undefined) uberURL += '&' + 'pickup_longitude=' + $scope.coords.longitude;
          uberURL += '&' + 'dropoff_latitude=' + eventLatitude;
          uberURL += '&' + 'dropoff_longitude=' + eventLongitude;
          uberURL += '&' + 'dropoff_nickname=' + 'Thinkful';

          // Redirect to Uber
          window.location.href = uberURL;
        };
      };
    }).error(function(data) {
      console.log('could not find this url');
    });

    console.log('before it happens');

    $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
    .success(function(data, status, headers, config) {
      console.log(data.response);
      $scope.venues = data.response.venues;

      for (var index = 0; index < $scope.venues.length; index++) {
        console.log('foursquare: ', $scope.venues[index].location.lat);

        var clubLatitude = $scope.venues[index].location.lat,
        clubLongitude = $scope.venues[index].location.lng;

        $http.get('https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' + clubLatitude + '&end_longitude='+ clubLongitude + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn')
        .success(function(data, status, headers, config) {
         var result = data.prices;
          // console.log(data.['prices']);

          if (typeof result !== typeof undefined) {
            // Sort Uber products by time to the user's location
            result.sort(function(t0, t1) {
              return t0.duration - t1.duration;
            });

            // Update the Uber button with the shortest time
            var shortest = result[0];
            if (typeof shortest !== typeof undefined) {
              console.log('Updating time estimate...');
              $('#time').html('in ' + Math.ceil(shortest.duration / 60.0) + ' min');
            }
          }

        }).error(function(data) {
          console.log('could not load uber');
        });

        $scope.uber2 = function() {
          var uberURL = 'https://m.uber.com/sign-up?';

          // Add parameters
          uberURL += 'client_id=' + uberClientId;
          if (typeof $scope.coords.latitude !== typeof undefined) uberURL += '&' + 'pickup_latitude=' + $scope.coords.latitude;
          if (typeof $scope.coords.longitude !== typeof undefined) uberURL += '&' + 'pickup_longitude=' + $scope.coords.longitude;
          uberURL += '&' + 'dropoff_latitude=' + clubLatitude;
          uberURL += '&' + 'dropoff_longitude=' + clubLongitude;
          uberURL += '&' + 'dropoff_nickname=' + 'Thinkful';

          // Redirect to Uber
          window.location.href = uberURL;
        };
      }
    }).error(function(data) {
      console.log('could not find this url');
    });

    $scope.uploadFile = function(files) {
      var fd = new FormData();
      //Take the first selected file
      fd.append('file', files[0]);

      $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.image = data.image;

      }).error(function(data) {
        console.log('Could not upload');
    });

  };
});

}]);
