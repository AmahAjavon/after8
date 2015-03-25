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






// angular.module('after8', ['angularFileUpload']);
//
// var UploadCtrl = [ '$scope', '$upload', function($scope, $upload) {
//   $scope.onFileSelect = function($files) {
//     //$files: an array of files selected, each file has name, size, and type.
//     for (var i = 0; i < $files.length; i++) {
//       var file = $files[i];
//       $scope.upload = $upload.upload({
//         url: 'server/upload/url', //upload.php script, node.js route, or servlet url
//         data: {myObj: $scope.myModelObj},
//         file: file,
//       }).progress(function(evt) {
//         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//       }).success(function(data, status, headers, config) {
//         // file is uploaded successfully
//         console.log(data);
//       });
//     }
//   };
// }];

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//
//         reader.onload = function (e) {
//             $('#picture').attr('src', e.target.result);
//         }
//
//         reader.readAsDataURL(input.files[0]);
//     }
// }
//
// $("#imgInp").change(function(){
//     readURL(this);
// });
