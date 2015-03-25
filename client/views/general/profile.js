'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);

    var uberClientId = 'IuEmQipRiQGncyZ4ySFYz1uKdD-uHLZW'
    , uberServerToken = 'm6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn';

    $scope.lastFM = function() {
      $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&distance=1000&limit=20&api_key=b93c2762033e97bcdf97392e7d0dd42c&format=json')
      .success(function(data, status, headers, config) {
        console.log(data);
        $scope.shows = data.events.event;
        for (var i=0; i< events.length; i++) {
        console.log($scope.event[0].location['geo:point']['geo:lat']);
        // $scope.uber = function() {
        //   $http.get('https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' +  + '&end_longitude='+  + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn-IuEmQipRiQGncyZ4ySFYz1uKdD-uHLZW')
        //     .success(function(data, status, headers, config) {
        //
        //     }).error(function(data) {
        //       console.log('could not load uber');
        //     })
        //   // partyLatitude = data.event.[0]location.geo:point.geo:lat;
        //   // partyLongitude = data.event.location.geo:point.geo:long;
        //   // $scope.artists.artist = toString(data.artist);
        //   // console.log(data.events.event[0].image[3]['#text']);
        //
        //   }
        }
      }).error(function(data) {
        console.log('could not find this url');
      });

    };

    console.log('before it happens');
    $scope.foursquare = function() {
      $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
      .success(function(data, status, headers, config) {
        console.log(data.response);
        $scope.venues = data.response.venues;
        // for (var i=0; i< venues.length; i++) {
        console.log($scope.venues[0].location.lat)
        console.log($scope.venues[0].location.lng)
        // partyLatitude = data.response.venues.location.lat;
        // partyLongitude = data.response.venues.location.lng;
        // $scope.clubLatitude = $scope.venues[0].location.lat
        // $scope.clubLongitude = $scope.venues[0].location.lng

        // $scope.uber = function() {
        //   $http.get('https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' + $scope.clubLatitude + '&end_longitude='+ $scope.clubLongitude + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn')
        //     .success(function(data, status, headers, config) {
        //
        //       console.log(data);
        //
        //
        //     }).error(function(data) {
        //       console.log('could not load uber');
        //     })
        //   }


        // }
      }).error(function(data) {
        console.log('could not find this url');
      });

    };
  });

  $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

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

  // var  userLatitude = $scope.coords.latitude,
  //   userLongitude = $scope.coords.longitude;

}]);

// navigator.geolocation.watchPosition(function(position){
//
//
//   userLatitude = $scope.coords.latitude;
//   userLongitude = $scope.coords.longitude;
//
//   // Create timer if needed
//   // Once initialized, it will fire every 60 seconds as recommended by the Uber API
//   // We only create the timer after we've gotten the user's location for the first time
//   if (typeof timer === typeof undefined) {
//     timer = setInterval(function() {
//       getEstimatesForUserLocation(userLatitude, userLongitude);
//     }, 60000);
//
//     // Query Uber API if needed
//     getEstimatesForUserLocation(userLatitude, userLongitude);
//   }
// });



// function getEstimatesForUserLocation(latitude,longitude) {
//   $.ajax({
//     url: 'https://api.uber.com/v1/estimates/price',
//     headers: {
//       Authorization: 'Token ' + uberServerToken
//     },
//     data: {
//       start_latitude: latitude,
//       start_longitude: longitude,
//       end_latitude: partyLatitude,
//       end_longitude: partyLongitude
//     },
//     success: function(result) {
//       console.log(JSON.stringify(result));
//
//       // 'results' is an object with a key containing an Array
//       var data = result['prices'];
//       if (typeof data !== typeof undefined) {
//         // Sort Uber products by time to the user's location
//         data.sort(function(t0, t1) {
//           return t0.duration - t1.duration;
//         });
//
//         // Update the Uber button with the shortest time
//         var shortest = data[0];
//         if (typeof shortest !== typeof undefined) {
//           console.log('Updating time estimate...');
//           $('#time').html('IN ' + Math.ceil(shortest.duration / 60.0) + ' MIN');
//         }
//       }
//     }
//   });
// }
//
// $('a').click(function(event){
//   // Redirect to Uber API via deep-linking to the mobile web-app
//   var uberURL = 'https://m.uber.com/sign-up?';
//
//   // Add parameters
//   uberURL += 'client_id=' + uberClientId;
//   if (typeof userLatitude != typeof undefined) uberURL += '&' + 'pickup_latitude=' + userLatitude;
//   if (typeof userLongitude != typeof undefined) uberURL += '&' + 'pickup_longitude=' + userLongitude;
//   uberURL += '&' + 'dropoff_latitude=' + partyLatitude;
//   uberURL += '&' + 'dropoff_longitude=' + partyLongitude;
//   uberURL += '&' + 'dropoff_nickname=' + 'Thinkful';
//
//   // Redirect to Uber
//   window.location.href = uberURL;
// });








// angular.module('after8')
//
// .config(['flowFactoryProvider', function (flowFactoryProvider) {
//   flowFactoryProvider.defaults = {
//     target: 'upload.php',
//     permanentErrors: [404, 500, 501],
//     maxChunkRetries: 1,
//     chunkRetryInterval: 5000,
//     simultaneousUploads: 4,
//     singleFile: true
//   };
//   flowFactoryProvider.on('catchAll', function (event) {
//     console.log('catchAll', arguments);
//   });
//
// }]);
