myApp.service(
  'cartService',
  [
    '$http',
    'localStorageService',

    function(
      $http,
      localStorageService
    ) {
      var cart = {
        nbProducts : 0,
        total : 0,
        products : []
      };

      var init = function () {
        var storage = localStorageService.get('cart');
        if (storage) {
          cart = storage;
        }
      };
      init();

      var clearCart = function () {
        localStorageService.remove('cart');
        cart = {
          nbProducts : 0,
          total : 0,
          products : []
        };
      };

      var updateLocalStorage = function () {
        localStorageService.set('cart', cart);
      };

      var getCart = function () {
        return cart;
      };

      var addNProducts = function (product, quantity) {
        cart.nbProducts += quantity;
        cart.total += product.price * quantity;

        var found = false;
        cart.products.forEach(function (p, ind, array) {
          if (p.id === product.id) {
            found = true;
            cart.products[i].quantity += quantity;
          }
        });

        if (! found){
          cart.products.push(product);
          cart.products[cart.products.length -1].quantity = quantity;
        }
        updateLocalStorage();
      };

      var addProduct = function (product) {
        addNProducts(product, 1);
      };

      var removeNProducts = function (product, quantity) {
        cart.products.forEach(function (p, ind, arr) {
          if (p.id === product.id) {
            if (quantity >= p.quantity) {
              cart.products.splice(ind,1);
            } else {
              cart.products[ind].quantity -= quantity;
            }
            cart.nbProducts -= quantity;
            cart.total -= product.price * quantity;
            updateLocalStorage();
          }
        });
      };

      var updateTotal = function () {
        cart.total = 0;
        cart.nbProducts = 0;
        cart.products.forEach(function (p, ind, arr) {
          cart.total += p.price * p.quantity;
          cart.nbProducts += p.quantity;
        });
      };


      return {
        getCart : getCart,
        addProduct : addProduct,
        addNProducts : addNProducts,
        removeNProducts : removeNProducts,
        clearCart : clearCart,
        updateTotal : updateTotal
      }
    }
  ]
);