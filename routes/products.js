var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var path = require('path');



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
      }
    });
    res.send(obj);
  });
});

module.exports = router;