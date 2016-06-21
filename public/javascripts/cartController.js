myApp.controller(
  'CartController',
  [
    'cartService',
    '$scope',

    function (cartService, $scope) {
      $scope.cart = cartService.getCart();

      $scope.updateQuantity = function () {
        cartService.updateTotal();
      };

      $scope.removeBeer = function (beer) {
        cartService.removeNProducts(beer, beer.quantity);
      };


    }
  ]
);