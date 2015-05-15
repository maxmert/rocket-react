'use strict';

var Logdown = require('logdown');
var format  = require('util').format;
var _       = require('lodash');

var Logger = function(prefix) {
    this._logger = new Logdown({prefix: prefix || ''});
};

Logger.prototype.info = function() {
    return this._logger.info(format.apply(null, _.values(arguments)));
};

Logger.prototype.error = function() {
    return this._logger.error(format.apply(null, _.values(arguments)));
};

Logger.prototype.log = function() {
    return this._logger.log(format.apply(null, _.values(arguments)));
};

module.exports = Logger;
