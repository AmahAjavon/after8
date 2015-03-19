'use strict';

angular.module('after8')

.controller('ProfileCtrl', ['$scope','CommonProp', '$http', function($scope, CommonProp, $http) {
  $scope.username = CommonProp.getUser();

  $scope.firstLog = function() {
  $http.get('http://ws.audioscrobbler.com/2.0/?method=venue.getevents&api_key=b93c2762033e97bcdf97392e7d0dd42c&venue=8908030&format=json')
  .success(function(data, status, headers, config) {
      console.log(data);
   }).error(function(data) {
     console.log('could not find this url');
   });

 };

 $scope.secondLog = function() {
 $http.get('https://api.foursquare.com/v2/events/categories?oauth_token=0ITXVPPFAN00QFV5KF1RFWBXGCTROVMQ1FS4YC0OHHPRYDX5&v=20150318')
 .success(function(data, status, headers, config) {
     console.log(data);
  }).error(function(data) {
    console.log('could not find this url');
  });

};

 // QOEOT4TVSUEREZMIJKAL3GAD50LYMFXUMNGYIFMS0WQZZIF1

 // API Key: b93c2762033e97bcdf97392e7d0dd42c
 // Secret: is cfbebf4daff6959f5da79da68077bbc9

// $scope.firstLog = function() {
//
//   var oArgs = {
//
//             app_key:'8BfNz4RqM2qS4K6x',
//             id: '20218701',
//             page_size: 25 ,
//   };
//
//   EVDB.API.call('/events/get', oArgs, function(oData) {
//
//       // Note: this relies on the custom toString() methods below
//       console.log(oData);
//     });
// }
//
// $scope.secondLog = function() {
//
//    var oArgs = {
//
//       app_key: '8BfNz4RqM2qS4K6x',
//       q: 'music',
//       where: 'San Diego',
//       'date': '2013061000-2015062000',
//       page_size: 5,
//       sort_order: 'popularity',
//    };
//
//    EVDB.API.call('/events/search', oArgs, function(oData) {
//
//       // Note: this relies on the custom toString() methods below
//       console.log(oData);
//     });
// }

}])
