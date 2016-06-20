'use strict';

var myApp = angular.module('beerApp', [
  'ngRoute',
  'ui.bootstrap',
  'LocalStorageModule'

]);

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: './partials/products'
    //controller: 'cartController'
  }).when('/cart', {
    templateUrl: './partials/cart'
  }).otherwise({
    redirectTo: './partials/products'
  });

});

myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('BeerStore');
});

myApp.value('API_URL', 'api/products');