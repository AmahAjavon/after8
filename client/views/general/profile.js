'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);





  $scope.lastFM = function() {
    $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&distance=1000&limit=20&api_key=b93c2762033e97bcdf97392e7d0dd42c&format=json')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.shows  = data.events.event;
      // $scope.artists.artist = toString(data.artist);
      // console.log(data.events.event[0].image[3]['#text']);
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


  // 'http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&distance=1000&api_key=b93c2762033e97bcdf97392e7d0dd42c&format=json'
  // 'http://api.songkick.com/api/3.0/events.json?location=geo:' + $scope.coords.latitude +','+ $scope.coords.longitude + '&apikey=92Bfe1LmFv9AbRER'

//   $scope.google = function() {
//   $http.get('https://maps.googleapis.com/maps/api/place/radarsearch/json?location='+ $scope.coords.latitude + ',' + $scope.coords.longitude +'&radius=5000&types=nightclub|bar&key=AIzaSyBo3d6CeOkKIOM7LJKtaYqmMpmPgpm0IIo')
//   .success(function(data, status, headers, config) {
//     console.log(data);
//   }.error(function(data) {
//     console.log('could not find this url');
//   })
//
// }

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
