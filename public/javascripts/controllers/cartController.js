myApp.controller(
  'CartController',
  [
    'cartService',
    '$scope',
    '$http',
    'API_URL',
    'toaster',
    '$location',
    '$timeout',

    function (cartService, $scope, $http, API_URL, toaster, $location, $timeout) {
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
            toaster.pop({
              type: 'success',
              title: '',
              body: res.message,
              timeout: 3500
            });

            $timeout(function(){
              cartService.clearCart();
              $location.path('/');
            }, 1000);
          } else {
            toaster.pop({
              type: 'error',
              title: '',
              body: res.message,
              timeout: 3500
            });
          }
        });
      }

    }
  ]
);