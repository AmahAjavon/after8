/* global Firebase:true */

'use strict';


angular.module('after8')

.controller('HomeCtrl', ['$scope', '$firebaseAuth', function($scope, $firebaseAuth) {
  var firebaseObj = new Firebase('https://after8.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseObj);

  $scope.fblogin = function() {
    firebaseObj.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });
  };

  $scope.twilogin = function() {
    firebaseObj.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });
  };

  $scope.goologin = function() {
    firebaseObj.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });
  };

//   $scope.signUp = function() {
//     firebaseObj.createUser({
//     email: 'user.email',
//     password: 'user.password'
//   }, function(error, userData) {
//     if (error) {
//       console.log('Error creating user:', error);
//     } else {
//       console.log('Successfully created user account with uid:', userData.uid);
//     }
//
//   });
// };

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
// CommonProp.setUser(user.password.email);
// $location.path('/welcome');
  }, function(error) {
      //Failure callback
      console.log('Authentication failure');
  });
};
}]);
