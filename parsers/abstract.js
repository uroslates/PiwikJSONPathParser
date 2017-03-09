'use strict';

function AbstractParser(dataToParse) {
  this.data = dataToParse;
  return this;
}

AbstractParser.prototype.parse = function(dataToParse) {
  return this.doParse(dataToParse || this.data || {});
};

/** @abstract */
AbstractParser.prototype.doParse = function(dataToParse) {
  throw new Error('Method not implemented');
};

module.exports = AbstractParser;