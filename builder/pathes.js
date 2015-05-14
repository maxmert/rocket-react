'use strict';

var join         = require('path').join;

var isProduction = require('./common.js').isProduction();

var pathes = {
    base: join(__dirname,'..'),
    get static() {
        return join(pathes.base, 'static')
    },

    get staticDev() {
        return join(pathes.static, 'development')
    },

    get staticProd() {
        return join(pathes.static, 'production')
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
        }
    }
}

module.exports = pathes;
