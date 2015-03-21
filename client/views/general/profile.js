'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords.latitude + ' ' + $scope.coords.longitude);

  });

  $scope.firstLog = function() {
    $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=stockholm&api_key=b93c2762033e97bcdf97392e7d0dd42c&venue=8908030&format=json')
    .success(function(data, status, headers, config) {
      console.log(data);
    }).error(function(data) {
      console.log('could not find this url');
    });

  };
  console.log('before it happens');
  $scope.secondLog = function() {
    $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.venues = data.response.venues;
      console.log('here', $scope.venues[0].categories[0].icon);

      // for (var i = 0; i< $scope.venues.length; i++) {
      //   $scope.venue.name = data.response.venues[i].name;
      //   $scope.venue.city = data.response.venues[i].location.city;
      //   $scope.venue.shortName = data.response.venues[i].categories[0].shortName;
      //   $scope.venue.checkinsCount = data.response.venues[i].stats.checkinsCount;
      //   $scope.venue.usersCount = data.response.venues[i].stats.usersCount;
      //   $scope.venue.icon = data.response.venues[i].categories[0].icon.prefix + '/400x400/' + data.response.venues[i].categories[0].icon.suffix;
      //   $scope.venue.coords = data.response.venues[i].location.lat + ',' + data.response.venues[i].location.lng;
      //   $scope.venue.url = data.response.venues[i].url;
        // console.log('image',data.response.venues[0].categories[0].icon);
        // console.log('image',data.response.venues[0].categories[0].icon.prefix);
        // console.log('image',data.response.venues[0].categories[0].icon.suffix);


      console.log('venue image');

    }).error(function(data) {
      console.log('could not find this url');
    });

  };

}]);




// $scope.foursquare = 'https://api.foursquare.com/v2/venues/search?ll=';
// $scope.latlon = $scope.coords.latitude + ',' + $scope.coords.longitude;
// $scope.tokenClub = '&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319';





// angular.module('after8', [])
//     .directive('reverseGeocode', function () {
//         return {
//             restrict: 'E',
//             template: '<div></div>',
//             link: function (scope, element, attrs) {
//                 var geocoder = new google.maps.Geocoder();
//                 var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
//                 geocoder.geocode({ 'latLng': latlng }, function (results, status) {
//                     if (status == google.maps.GeocoderStatus.OK) {
//                         if (results[1]) {
//                             element.text(results[2].address_components[1].long_name);
//                         } else {
//                             element.text('Location not found');
//                         }
//                     } else {
//                         element.text('Geocoder failed due to: ' + status);
//                     }
//                 });
//             },
//             replace: true
//         }
//     });
