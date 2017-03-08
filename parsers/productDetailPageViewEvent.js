'use strict';

var Promise = require('promise');
var AbstractParser = require('./abstract');
var utils = require('../utils');

var PRODUCT_PROP_PATHS = {
  productSku: '$..*[?(@ === \'_pks\')]',
  productName: '$..*[?(@ === \'_pkn\')]',
  productCategory: '$..*[?(@ === \'_pkc\')]',
};

var parsePromise = function(data, path) {
  return utils.PromisifiedJSONPath({
      json: data,
      path: path,
      resultType: 'parent',
      wrap: false
    });
};

function ProductDetailPageViewEventParser(dataToParse) {
  AbstractParser.call(this, dataToParse);
  return this;
}
ProductDetailPageViewEventParser.prototype = Object.create(AbstractParser.prototype);
ProductDetailPageViewEventParser.prototype.constructor = ProductDetailPageViewEventParser;

ProductDetailPageViewEventParser.prototype.parse = function(dataToParse) {
  var data = dataToParse || this.data || {};
  var properties = {
      name: parsePromise(data, PRODUCT_PROP_PATHS.productName),
      sku: parsePromise(data, PRODUCT_PROP_PATHS.productSku),
      category: parsePromise(data, PRODUCT_PROP_PATHS.productCategory),
    };
  return Promise.all([properties.name, properties.sku, properties.category])
    .then(this.serialize);
};

/**
 * Product parser serializer
 * @param  {Object} response object with metadata for each product detail property
 * @return {Object}          serialized product parser value to be consumed by clients
 */
ProductDetailPageViewEventParser.prototype.serialize = function(response) {
  var name = response[0],
      sku = response[1],
      category = response[2];
  return {
    name: {
      value: name.payloadValue[1],
      path: name.fullPayload.path,
      raw: name
    },
    sku: {
      value: sku.payloadValue[1],
      path: sku.fullPayload.path,
      raw: sku
    },
    category: {
      value: category.payloadValue[1],
      path: category.fullPayload.path,
      raw: category
    }
  };
};

module.exports = ProductDetailPageViewEventParser;