myApp.controller(
  'productController',
  [
    '$scope',
    '$http',
    '$location',
    'API_URL',
    'cartService',
    function ($scope, $http, $location, API_URL, cartService) {
      $scope.cart = cartService.getCart();

      $scope.loadProductsPage = function (index) {
        $http.get(API_URL + '/' + index).then(function (response) {
          if (response.data) {
            $scope.products = response.data;
            console.log($scope.products);
          }
        });
      };
      $scope.loadProductsPage(1);

      $scope.addToCart = function (product) {
        cartService.addProduct(product);
        console.log($scope.cart);
      };


    }
  ]
);
