/* global Firebase:true */

'use strict';

angular.module('after8')

.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
  var firebaseObj = new Firebase('https://after8.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseObj);
  var user = '';

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
