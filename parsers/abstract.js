'use strict';

function AbstractParser(dataToParse) {
  this.data = dataToParse;
  return this;
}

AbstractParser.prototype.parse = function() {
  throw new Error('Method not implemented');
};

module.exports = AbstractParser;