var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var path = require('path');

var floor = function(figure, decimals){
  if (!decimals) decimals = 2;
  var d = Math.pow(10,decimals);
  return (parseInt(figure*d)/d).toFixed(decimals);
};

router.get('/', function(req, res, next) {
  var filePath = path.join(__dirname + '/..' + '/data/products.json');

  jsonfile.readFile(filePath, function (err, obj) {
    res.send(obj);
  });
});

router.get('/:index', function(req, res, next) {
  var index = req.params.index;
  var filePath = path.join(__dirname + '/..' + '/data/products.json');

  jsonfile.readFile(filePath, function (err, obj) {
    obj.forEach(function (o, ind, array) {
      if (o.price) {
        o.price += o.price * (index - 1) / 10;
        o.price = floor(o.price);
      }
      o.id = ind + (index - 1) * array.length;
    });
    res.send(obj);
  });
});

module.exports = router;