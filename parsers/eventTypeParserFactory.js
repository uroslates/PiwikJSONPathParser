'use strict';

var AbstractParser = require('./abstract');
var ProductDetailPageViewEventParser = require('./productDetailPageViewEvent');

function EventTypeParserFactory(eventJson) {
  var parser;
  
  switch(eventJson['action_name']) {
    case 'ProductDetailPageViewEvent':
        parser = new ProductDetailPageViewEventParser(eventJson);
        break;
    default:
        parser = new AbstractParser(eventJson);
  }

  return parser;
}

module.exports = EventTypeParserFactory;