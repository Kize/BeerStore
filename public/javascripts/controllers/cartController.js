myApp.controller(
  'CartController',
  [
    'cartService',
    '$scope',
    '$http',
    'API_URL',

    function (cartService, $scope, $http, API_URL) {
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
        $http.post(API_URL + 'order', {cart : $scope.cart, order : $scope.form}).then(function (response) {
          var res = response.data;
          if (res.status) {
            // toast ok message
          } else {
            // toast not ok message
          }
        });
      }

    }
  ]
);