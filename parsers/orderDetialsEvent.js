'use strict';

var Promise = require('promise');
var AbstractParser = require('./abstract');
var utils = require('../utils');

var PROP_PATHS = {
  shippingAddress: '$.cvar.body.shipmentInfo.address',
};

function OrderDetailsEventParser(dataToParse) {
  AbstractParser.call(this, dataToParse);
  return this;
}
OrderDetailsEventParser.prototype = Object.create(AbstractParser.prototype);
OrderDetailsEventParser.prototype.constructor = OrderDetailsEventParser;

OrderDetailsEventParser.prototype.doParse = function(data) {
  var properties = {
      shippingAddress: utils.parsePromise(data, PROP_PATHS.shippingAddress),
    };
  return Promise.all([properties.shippingAddress])
    .then(this.serialize);
};

/**
 * Product parser serializer
 * @param  {Object} response object with metadata for each product detail property
 * @return {Object}          serialized product parser value to be consumed by clients
 */
OrderDetailsEventParser.prototype.serialize = function(response) {
  var shippingAddress = response[0];
  return {
    shippingAddress: {
      value: shippingAddress.payloadValue,
      path: shippingAddress.fullPayload.path,
      raw: shippingAddress
    }
  };
};

module.exports = OrderDetailsEventParser;