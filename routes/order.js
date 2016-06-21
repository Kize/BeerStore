var express = require('express');
var router = express.Router();

var checkForm = function (form) {
  return (form.firstName.length < 2 || form.lastName.length < 2 || form.street.length < 2 || form.city.length < 2 || form.zipCode < 1 || form.creditCard < 1);
};

router.post('/', function (req, res) {
  var cart = req.body.cart;
  var order = req.body.order;

  if (cart && cart.products && cart.products.length > 0 && checkForm(order)) {
    res.send({
      status  : true,
      message : "La livraison a été approuvée. Merci d'avoir commandé vos bières chez BeerStore."
    });
  } else {
    res.send({
      status  : false,
      message : "La livraison n'a pas pu aboutir. Veuillez essayer une autre carte de crédit ou contactez notre service clientèle."
    });
  }
});

module.exports = router;