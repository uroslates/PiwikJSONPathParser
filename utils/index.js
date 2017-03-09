'use strict';

var JSONPath = require('JSONPath');
var Promise = require('promise');

var PromisifiedJSONPath = function(config) {
  return new Promise(function (resolve, reject) {
    var callback = function(payloadValue, paylaodType, fullPayload) {
        resolve({
          payloadValue: payloadValue,
          paylaodType: paylaodType,
          fullPayload: fullPayload
        });
      };
    var originalCallback = config.callback;
    config.callback = callback;
    JSONPath(config);
  });
};

var parsePromise = function(data, path) {
  return PromisifiedJSONPath({
      json: data,
      path: path,
      resultType: 'parent',
      wrap: false
    });
};

module.exports = {
  PromisifiedJSONPath: PromisifiedJSONPath,
  parsePromise: parsePromise
};