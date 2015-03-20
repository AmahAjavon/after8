// 'use strict';
//
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
