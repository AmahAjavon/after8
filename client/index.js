'use strict';

angular.module('after8', ['ui.router', 'ngMessages', 'geolocation', 'firebase'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html', controller: 'HomeCtrl'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})
      .state('signout', {url:'/', templateUrl:'/views/general/home.html'})
      .state('register', {url:'/register', templateUrl:'/views/general/register.html', controller: 'RegisterCtrl'})
      .state('profile', {url:'/profile', templateUrl:'/views/general/profile.html', controller: 'ProfileCtrl'})
      .state('feed', {url:'/feed', templateUrl:'/views/general/feed.html'});
  }]);
