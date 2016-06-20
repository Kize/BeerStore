myApp.controller(
  'ProductController',
  [
    '$scope',
    '$http',
    'API_URL',
    'cartService',
    '$uibModal',

    function ($scope, $http, API_URL, cartService, $uibModal) {
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

      $scope.open = function (product) {
        $scope.modalProduct = product;
        $uibModal.open({
          templateUrl: 'productModal.html',
          controller: 'ModalController',
          resolve : {
            product: function () {
              //console.log($scope.modalProduct);
              return $scope.modalProduct;
            }
          }
        });
      };

      //cartService.clearCart();

    }
  ]
);

myApp.controller(
  'ModalController',
  [
    '$scope',
    'cartService',
    '$uibModalInstance',
    'product',

    function ($scope, cartService, $uibModalInstance, product) {
      $scope.product = product;

      $scope.addToCart = function () {
        cartService.addProduct(product);
        console.log(product);

        $uibModalInstance.close();
      };


      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]
);
