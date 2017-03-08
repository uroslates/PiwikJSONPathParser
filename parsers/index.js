'use strict';

var AbstractParser = require('./abstract');
var ProductDetailPageViewEventParser = require('./productDetailPageViewEvent');
var EventTypeParserFactory = require('./eventTypeParserFactory');

module.exports = {
  AbstractParser: AbstractParser,
  ProductDetailPageViewEventParser: ProductDetailPageViewEventParser,
  EventTypeParserFactory: EventTypeParserFactory
};