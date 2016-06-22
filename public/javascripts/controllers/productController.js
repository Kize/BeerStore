myApp.controller(
  'ProductController',
  [
    '$scope',
    '$http',
    'API_URL',
    'cartService',
    '$uibModal',

    function ($scope, $http, API_URL, cartService, $uibModal) {
      var pageIndex = 0;
      $scope.cart = cartService.getCart();
      $scope.products = [];
      var slides = $scope.slides = [];
      $scope.carouselIndex = 0;

      var updateCarousel = function (products) {
        for(var i = 0; i < 5; i++) {
          var randomPosition = Math.floor((Math.random() * products.length));
          var alreadyAdded = false;

          while (!alreadyAdded) {
            var product = products[randomPosition];
            slides.forEach(function (p, ind, arr) {
              if (p.id === product.id) {
                alreadyAdded = true;
              }
            });
            if (alreadyAdded) {
              randomPosition = Math.floor((Math.random() * products.length));
              alreadyAdded = false;
            } else {
              slides.push(product);
              alreadyAdded = true;
            }
          }
        }
      };

      $scope.loadProductsPage = function () {
        if (pageIndex < 11 ) {
          pageIndex ++;
          $http.get(API_URL + 'products/' + pageIndex).then(function (response) {
            if (response.data) {
              if (pageIndex === 1 ) {
                updateCarousel(response.data);
              }
              response.data.forEach(function (p, ind, arr) {
                $scope.products.push(p);
              });
            }
          });
        }
      };
      $scope.loadProductsPage();

      $scope.addToCart = function (product) {
        cartService.addProduct(product);
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
