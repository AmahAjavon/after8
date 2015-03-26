/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('ChatCtrl', ['$scope', '$firebaseArray',
function($scope, $firebaseArray) {

  var ref = new Firebase('https://after8.firebaseio.com/');

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function() {

    // if (e.keyCode === 13 && $scope.msg)
    $scope.addMessage = function() {

      var name = $scope.name || 'anonymous';

      $scope.messages.$add({
        from: name,
        body: $scope.msg
      });

      $scope.msg = '';
    };
  };

 }
])

.controller('ImageUpload', ['$scope', '$log',
	function ImageUpload($scope, $log) {
		$scope.upload_image = function (image) {
			if (!image.valid) return;

			var imagesRef, safename, imageUpload;
debugger;
			image.isUploading = true;
			imageUpload = {
				isUploading: true,
				data: image.data,
				thumbnail: image.thumbnail,
				name: image.filename,
				author: {
					provider: $scope.auth.user.provider,
					id: $scope.auth.user.id
				}
			};

			safename = imageUpload.name.replace(/\.|\#|\$|\[|\]|-|\//g, '');
			imagesRef = new Firebase($scope.firebaseUrl + '/images');

			imagesRef.child(safename).set(imageUpload, function (err) {
				if (!err) {
					imagesRef.child(safename).child('isUploading').remove();
					$scope.$apply(function () {
						$scope.status = 'Your image "' + image.filename + '" has been successfully uploaded!';
						if ($scope.uploaded_callback !== undefined) {
							$scope.uploaded_callback(angular.copy(imageUpload));
						}
						image.isUploading = false;
						image.data = undefined;
						image.filename = undefined;
					});
				}else{
					$scope.error = 'There was an error while uploading your image: ' + err;
				}
			});
		};
	}
])

.directive('fbImageUpload', [function() {
	return {
		link: function(scope, element, attrs) {
			// Modified from https://developer.mozilla.org/en-US/docs/Web/API/FileReader
			var fileReader = new FileReader();
			var fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
			var wasUploading = false;

			scope.image = {valid: false};

			scope.$watch('image.isUploading', function () {
				var isUploading = scope.image.isUploading;
				if (isUploading && !wasUploading) {
					wasUploading = true;
				}else if (!isUploading && wasUploading) {
					wasUploading = false;
					element.parent().parent()[0].reset();
				}
			});

			fileReader.onload = function (fileReaderEvent) {
				scope.$apply(function () {
					scope.image.data = fileReaderEvent.target.result;
				});
			};

			var load_image = function(imageInput) {
				if (imageInput.files.length === 0) {
					return;
				}

				var file = imageInput.files[0];

				scope.image.filename = file.name;

				if (!fileFilter.test(file.type)) {
					scope.error = 'You must select a valid image!';
					scope.image.valid = false;
					scope.$apply();
					return;
				}else{
					scope.error = '';
					scope.image.valid = true;
				}

				fileReader.readAsDataURL(file);
				scope.$apply();
			};

			element[0].onchange = function() {
				load_image(element[0]);
			};
		},
		restrict: 'A'
	};
}])

.directive('fbSrc', ['$log', function ($log) {
	// Used to embed images stored in Firebase

	/*
	Required attributes:
		fp-src (The name of an image stored in Firebase)
	*/
	return {
		link: function (scope, elem, attrs) {
			var safename = attrs.fpSrc.replace(/\.|\#|\$|\[|\]|-|\//g, '');
			var dataRef = new Firebase( [scope.firebaseUrl, 'images', safename].join('/') );
			elem.attr('alt', attrs.fpSrc);
			dataRef.once('value', function (snapshot) {
				var image = snapshot.val();
				if (!image) {
					$log.log('It appears the image ' + attrs.fpSrc + ' does not exist.');
				}else{
					elem.attr('src', image.data);
				}
			});
		},
		restrict: 'A'
	};
}]);


// var chatRef = new Firebase('https://after8.firebaseio.com/chat');
//
// $scope.fblogin = function () {
//   chatRef.authWithOAuthPopup('facebook', function(error, authData) {
//     if (error) {
//       console.log(error);
//     }
//   });
// }
//
// $scope.twilogin = function () {
//   chatRef.authWithOAuthPopup('twitter', function(error, authData) {
//     if (error) {
//       console.log(error);
//     }
//   });
// }
//
// $scope.twilogin = function () {
//   chatRef.authWithOAuthPopup('google', function(error, authData) {
//     if (error) {
//       console.log(error);
//     }
//   });
// }
//
// chatRef.onAuth(function(authData) {
//   // Once authenticated, instantiate Firechat with our user id and user name
//   if (authData) {
//     initChat(authData);
//   }
// });
//
// function initChat(authData) {
//   var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
//   chat.setUser(authData.uid, authData[authData.provider].displayName);
// }
