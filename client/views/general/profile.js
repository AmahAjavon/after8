'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope', 'geolocation', 'CommonProp', '$http', function($scope, geolocation, CommonProp, $http) {
  $scope.username = CommonProp.getUser();
  console.log('aj');
  geolocation.getLocation().then(function(data){
    $scope.coords = data.coords;
    console.log('here it is ', $scope.coords);

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
    $http.get('https://api.foursquare.com/v2/venues/search?ll=37.495408399999995,-121.91778540000001&query=nightlife-spot&oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150319')
    .success(function(data, status, headers, config) {
      console.log(data);
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
