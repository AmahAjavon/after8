/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('ChatCtrl', ['$scope', '$firebaseArray',
function($scope, $firebaseArray) {

  var ref = new Firebase('https://after8.firebaseio.com/');

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function() {

    // if (e.keyCode === 13 && $scope.msg)
      var name = $scope.name || 'anonymous';
      $scope.messages.$add({
        from: name,
        body: $scope.msg
      });

      $scope.msg = '';

  };

}])

// angular.module('after8')
// .controller('ChatCtrl', ['$scope', '$firebaseArray',
// function($scope, $firebaseArray) {
//     var chatRef = new Firebase('https://after8.firebaseio.com');
//   var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
//   chatRef.onAuth(function(authData) {
//     if (authData) {
//       chat.setUser(authData.uid, "Anonymous" + authData.uid.substr(10, 8));
//     } else {
//       chatRef.authAnonymously(function(error, authData) {
//         if (error) {
//           console.log(error);
//         }
//       });
//     }
//   });
//
// }])
