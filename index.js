'use strict';

var parsers     = require('./parsers');
var data        = require('./data/product-detail-event.json');

var parser = new parsers.EventTypeParserFactory(data);
parser.parse(data)
  .then(function(parsedData) {
    console.log('Parsed data: ', JSON.stringify(parsedData, null, 2));
  });
