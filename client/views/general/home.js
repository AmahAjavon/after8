/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('HomeCtrl', ['$scope', '$location', '$state', 'CommonProp', '$firebaseAuth', function($scope, $location, $state, CommonProp, $firebaseAuth) {
  var firebaseObj = new Firebase('https://after8.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseObj);
  var user = '';

  $scope.fblogin = function() {
    firebaseObj.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        $state.go('profile');
        console.log('the data is: ', authData.facebook.cachedUserProfile.first_name);
        $scope.username = authData.facebook.cachedUserProfile.first_name;
        $scope.userimage = authData.facebook.cachedUserProfile.picture.data.url;
      }
    });
  };

  $scope.twilogin = function() {
    firebaseObj.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        $state.go('profile');
        $scope.username = authData.twitter.username;
        $scope.userimage = authData.twitter.cachedUserProfile.profile_image_url;
      }
    });
  };

  $scope.goologin = function() {
    firebaseObj.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        $state.go('profile');
        $scope.username = authData.google.cachedUserProfile.given_name;
        $scope.userimage = authData.google.cachedUserProfile.picture;
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
      $state.go('profile');
    }, function(error) {
      //Failure callback
      console.log('Authentication failure');
    });
  };

  firebaseObj.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

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

// var vid = document.getElementById("bgvid");
// var pauseButton = document.querySelector("#polina button");
//
// function vidFade() {
//   vid.classList.add("stopfade");
// }
//
// vid.addEventListener('ended', function()
// {
// // only functional if "loop" is removed
// vid.pause();
// // to capture IE10
// vidFade();
// });
//
// $('#title').addClass('animated bounceOutLeft');
// pauseButton.addEventListener("click", function() {
//   vid.classList.toggle("stopfade");
//   if (vid.paused) {
//     vid.play();
//     pauseButton.innerHTML = "Pause";
//   } else {
//     vid.pause();
//     pauseButton.innerHTML = "Paused";
//   }
// })
