var myApp = angular.module('beerApp', [
  'ngRoute',
  'ui.bootstrap',

  'beerApp.productModule',
  'beerApp.cartModule'
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

myApp.value('API_URL', 'toto');