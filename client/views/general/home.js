/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
  var firebaseObj = new Firebase('https://after8.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseObj);
  var user = '';

 $scope.uploadImage = function() {
   var f = evt.target.files[0];
   var reader = new FileReader();
   reader.onload = (function(theFile) {
     return function(e) {
       var filePayload = e.target.result;
       // Generate a location that can't be guessed using the file's contents and a random number
       var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
       var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
       spinner.spin(document.getElementById('spin'));
       // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
       f.set(filePayload, function() {
         spinner.stop();
         document.getElementById("pano").src = e.target.result;
         $('#file-upload').hide();
         // Update the location bar so the URL can be shared with others
         window.location.hash = hash;
       });
     };
   })(f);
   reader.readAsDataURL(f);
 }

 $(function() {
   $('#spin').append(spinner);

   var idx = window.location.href.indexOf('#');
   var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
   if (hash === '') {
     // No hash found, so render the file upload button.
     $('#file-upload').show();
     document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
   } else {
     // A hash was passed in, so let's retrieve and render it.
     spinner.spin(document.getElementById('spin'));
     var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
     f.once('value', function(snap) {
       var payload = snap.val();
       if (payload != null) {
         document.getElementById("pano").src = payload;
       } else {
         $('#body').append("Not found");
       }
       spinner.stop();
     });
   }
 });


  $scope.fblogin = function() {
    firebaseObj.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);

        $location.path('/profile');
      }
    });
  };

  $scope.twilogin = function() {
    firebaseObj.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);

        $location.path('/profile');
      }
    });
  };

  $scope.goologin = function() {
    firebaseObj.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);

        $location.path('/profile');
      }
    });
  };


  $scope.user = {};
  $scope.signIn = function(e) {
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    loginObj.$authWithPassword({
      email: username,
      password: password
    })
    .then(function(user) {
      //Success callback
      console.log('Authentication successful');
      CommonProp.setUser(user.password.email);
      $location.path('/profile');
    }, function(error) {
      //Failure callback
      console.log('Authentication failure');
    });
  };


}])

.service('CommonProp', function() {
  var user = '';

  return {
    getUser: function() {
      return user;
    },
    setUser: function(value) {
      user = value;
    }
  };
});
