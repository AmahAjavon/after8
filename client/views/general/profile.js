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

  $scope.secondLog = function() {

    // $scope.foursquare = 'https://api.foursquare.com/v2/venues/search?ll=';
    // $scope.latlon = $scope.coords.latitude + ',' + $scope.coords.longitude;
    // $scope.tokenClub = '&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319';


    //  $scope.venue.clubName = response.venues[0].name,
    //  $scope.venue.clubCity = response.venues[0].location.city,
    //  $scope.venue.shortName = response.venues[0].categories[0].shortName,
    //  $scope.venue.checkinsCount = response.venues[0].stats.checkinsCount,
    //  $scope.venue.usersCount = response.venues[0].stats.usersCount,
    //  $scope.venue.clubUrl = response.venues[0].categories[0].icon.prefix + '/400x400/' + response.venues[0].categories[0].icon.suffix,
    //  $scope.venue.latlonclub = response.venues[0].location.lat + ',' + response.venues[0].location.lng
      console.log('before it happens')
    $http.get('https://api.foursquare.com/v2/venues/search?ll=' + $scope.coords.latitude + ',' + $scope.coords.longitude + '&query=nightclub&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
    .success(function(data, status, headers, config) {
        $scope.venues = data.venues
       console.log('venues: ' + $cope.venues)

    }).error(function(data) {
      console.log('could not find this url');
    });

  };

}]);

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
