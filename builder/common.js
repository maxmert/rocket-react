'use strict';

var argv = require('yargs').argv;

var isProduction = function() {
    return process.env.NODE_ENV == 'production' || argv.production === true;
}

module.exports = {
    isProduction: isProduction
};
