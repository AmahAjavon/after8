'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);

    // $scope.lastFM = function() {
    $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&distance=1000&limit=20&api_key=b93c2762033e97bcdf97392e7d0dd42c&format=json')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.shows = data.events.event;
      for (var index = 0; index < $scope.shows.length; index++) {
        console.log('lastfm geo', $scope.shows[index].venue.location['geo:point']['geo:lat']);

        var eventLatitude = $scope.shows[index].venue.location['geo:point']['geo:lat'],
        eventLongitude = $scope.shows[index].venue.location['geo:point']['geo:long'];

        $scope.uber = function() {
          $http.get('https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' + eventLatitude + '&end_longitude='+ eventLongitude + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn')
          .success(function(data, status, headers, config) {

            console.log(data);
          }).error(function(data) {
            console.log('could not load uber');
          });
        };
      }
    }).error(function(data) {
      console.log('could not find this url');
    });

    // 'https://api.uber.com/v1/estimates/price?start_latitude=' + $scope.coords.latitude +'&start_longitude=' + $scope.coords.longitude + '&end_latitude=' + eventLatitude + '&end_longitude='+ eventLongitude + '&server_token=m6y2-yeBTpRFxFnCITJN1h5xCCnlVSztRtaLcLsn'

    console.log('before it happens');
    $scope.foursquare = function() {
      $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
      .success(function(data, status, headers, config) {
        console.log(data.response);
        $scope.venues = data.response.venues;

        $scope.venues.forEach(function(position) {
          $scope.lats = position.response.location.lat;
          $scope.lngs = position.response.location.lng;

          console.log($scope.lats);
          console.log($scope.lngs);

        });
        // console.log($scope.venues[0].location.lat)
        // console.log($scope.venues[0].location.lng)
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
        // }


      }).error(function(data) {
        console.log('could not find this url');
      });

    };
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

}]);












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
