/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('ChatCtrl', ['$scope', '$firebaseArray',
function($scope, $firebaseArray) {

  var ref = new Firebase('https://after8.firebaseio.com/');

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function(e) {

    // if (e.keyCode === 13 && $scope.msg)
     $scope.addMessage = function() {

      var name = $scope.name || "anonymous";

      $scope.messages.$add({
        from: name,
        body: $scope.msg
      });

      $scope.msg = "";
    }
  }
}
]);

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#picture').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});
