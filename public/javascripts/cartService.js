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
        if (cart.products[product.id]) {
          cart.products[product.id].quantity += quantity;
        } else {
          cart.products[product.id] = product;
          cart.products[product.id].quantity = quantity;
        }
        updateLocalStorage();
      };

      var addProduct = function (product) {
        addNProducts(product, 1);
      };

      var removeNProducts = function (product, quantity) {
        if (cart.products[product.id]) {
          if (quantity >= cart.products[product.id].quantity) {
            cart.products[product.id] = null;
          } else {
            cart.products[product.id].quantity -= quantity;
          }
          cart.nbProducts -= quantity;
          cart.total -= product.price * quantity;
          updateLocalStorage();
        }
      };

      var removeProduct = function (product) {
        removeNProducts(product, 1);
      };


      return {
        getCart : getCart,
        addProduct : addProduct,
        addNProducts : addNProducts,
        removeProduct : removeProduct,
        removeNProducts : removeNProducts,
        clearCart : clearCart
      }
    }
  ]
);