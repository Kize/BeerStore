myApp.controller(
  'CartController',
  [
    'cartService',
    '$scope',

    function (cartService, $scope) {
      $scope.cart = cartService.getCart();
      $scope.form = {
        firstName   : "",
        lastName    : "",
        street      : "",
        zipCode     : undefined,
        city        : "",
        creditCard  : undefined
      };

      $scope.updateQuantity = function () {
        cartService.updateTotal();
      };

      $scope.removeBeer = function (beer) {
        cartService.removeNProducts(beer, beer.quantity);
      };

      $scope.sendOrder = function () {

      }

    }
  ]
);