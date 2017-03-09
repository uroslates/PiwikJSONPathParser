'use strict';

var parsers     = require('./parsers');
var data        = require('./data/product-detail-event.json');
var orderData   = require('./data/order.json');

var parser = new parsers.EventTypeParserFactory(data);
parser.parse(data)
  .then(function(parsedData) {
    console.log('\n\nProduct Detail Parsed data:\n', JSON.stringify(parsedData, null, 2));
  });

var orderParser = new parsers.EventTypeParserFactory(orderData);
orderParser.parse(orderData)
  .then(function(parsedData) {
    console.log('\n\nOrder Detail Parsed data:\n', JSON.stringify(parsedData, null, 2));
  });
