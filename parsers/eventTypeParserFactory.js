'use strict';

var AbstractParser = require('./abstract');
var ProductDetailPageViewEventParser = require('./productDetailPageViewEvent');
var OrderDetailsEventParser = require('./orderDetialsEvent');

function EventTypeParserFactory(eventJson) {
  var parser;
  
  switch(eventJson['action_name']) {
    case 'ProductDetailPageViewEvent':
        parser = new ProductDetailPageViewEventParser(eventJson);
        break;
    case 'OrderDetailEvent':
        parser = new OrderDetailsEventParser(eventJson);
        break;
    default:
        parser = new AbstractParser(eventJson);
  }

  return parser;
}

module.exports = EventTypeParserFactory;