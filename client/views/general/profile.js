'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);

  });

  $scope.lastFM = function() {
    $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat='+ $scope.coords.latitude + '&long=' + $scope.coords.longitude + '&api_key=b93c2762033e97bcdf97392e7d0dd42c&venue=8908030&format=json')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.shows  = data.events.event;
      // $scope.artists.artist = toString(data.artist);
      console.log(data.events.event[0].image[2]["#text"])
    }).error(function(data) {
      console.log('could not find this url');
    });

  };
  console.log('before it happens');
  $scope.foursquare = function() {
    $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.venues = data.response.venues;
      console.log('here', $scope.venues[0].categories[0].icon);

      console.log('venue image');

    }).error(function(data) {
      console.log('could not find this url');
    });

  };

}]);
