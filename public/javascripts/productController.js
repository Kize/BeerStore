myApp.controller(
  'productController',
  [
    '$scope',
    '$http',
    '$location',
    'API_URL',
    function ($scope, $http, $location, API_URL) {


      $scope.loadProductsPage = function (index) {
        $http.get(API_URL + '/' + index).then(function (response) {
          if (response.data) {
            $scope.products = response.data;
            console.log($scope.products);
          }
        });
      };

      $scope.loadProductsPage(1);


    }
  ]
);
