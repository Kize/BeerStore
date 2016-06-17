myApp.controller(
  'productController',
  [
    '$scope',
    '$http',
    '$location',
    'API_URL',
    function ($scope, $http, $location, API_URL) {
      $scope.title = 'Page de connexion';
      $scope.login = "";
      $scope.password = "";
      $scope.url = "api/login.php";

      $scope.sendLogin = function () {
        $scope.url = "";

        $scope.loadProductsPage = function (index) {
          $http.get(API_URL + '/' + index).then(function (response) {
            if (response.data) {
              var data = response.data;
              console.log(data);
            }
          });
        };

        //$scope.loadProductsPage(1);


      }
    }
  ]
);
