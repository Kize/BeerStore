'use strict';

var myApp = angular.module('beerApp', [
  'ngRoute',
  'ui.bootstrap'

]).config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: './partials/products'
    //controller: 'cartController'
  }).when('/cart', {
    templateUrl: './partials/cart'
  }).otherwise({
    redirectTo: './partials/products'
  });

});

myApp.value('API_URL', 'api/products');