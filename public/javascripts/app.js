'use strict';

var myApp = angular.module('beerApp', [
  'ngRoute',
  'ui.bootstrap',
  'LocalStorageModule',
  "smart-table"

]);

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: './partials/products'
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