myApp.controller(
  'CartController',
  [
    'cartService',
    '$scope',

    function (cartService, $scope) {
      $scope.cart = cartService.getCart();
    }
  ]
);