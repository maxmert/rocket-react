'use strict';

var join   = require('path').join;
var format = require('util').format;

var isProduction = require('./common.js').isProduction();

var pathes = {
    base: join(__dirname, '..'),
    get static() {
        return join(pathes.base, 'static');
    },

    get staticDev() {
        return join(pathes.static, 'development');
    },

    get staticProd() {
        return join(pathes.static, 'production');
    },

    get staticEnv() {
        return isProduction ? pathes.staticProd : pathes.staticDev;
    },

    js: {
        get src() {
            return join(pathes.base, 'client.js');
        },

        get dest() {
            return join(pathes.staticEnv, 'scripts');
        },

        get app() {
            return join(pathes.base, 'app');
        },

        get libs() {
            return join(pathes.base, 'libs');
        },

        get core() {
            return join(pathes.base, 'core');
        },

        get lint() {
            return [
                format('%s/**/*.jsx', pathes.js.app),
                format('%s/**/*.js', pathes.js.app),

                format('%s/**/*.jsx', pathes.js.libs),
                format('%s/**/*.js', pathes.js.libs),

                format('%s/**/*.jsx', pathes.js.core),
                format('%s/**/*.js', pathes.js.core)
            ];
        }
    }
};

module.exports = pathes;
