myApp.controller(
  'ProductController',
  [
    '$scope',
    '$http',
    'API_URL',
    'cartService',
    '$uibModal',

    function ($scope, $http, API_URL, cartService, $uibModal) {
      var pageIndex = 1;
      $scope.cart = cartService.getCart();
      $scope.products = [];

      $scope.loadProductsPage = function () {
        console.log(pageIndex);
        $http.get(API_URL + 'products/' + pageIndex).then(function (response) {
          if (response.data) {
            response.data.forEach(function (p, ind, arr) {
              $scope.products.push(p);
            });
            pageIndex ++;
          }
        });
      };
      $scope.loadProductsPage();

      $scope.addToCart = function (product) {
        cartService.addProduct(product);
        console.log($scope.cart);
      };

      $scope.open = function (product) {
        $scope.modalProduct = product;
        $uibModal.open({
          templateUrl: 'productModal.html',
          controller: 'ModalController',
          size: 'lg',
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