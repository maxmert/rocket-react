import express from 'express';
import _ from 'lodash';
import Service from './service.js';

import Mockmock from '../../../libs/mockmock';
import httpProxy from 'express-http-proxy';
import url from 'url';

export var statics = new Service((app, config) => {
    app.use(express.static(config.path.static.env));
});

export var mockmock = new Service((app, config, pathToAPI) => {
    var mock = new Mockmock(pathToAPI);
    app.use(mock.middleware);
});

export var proxy = new Service((app, config) => {
    _.forEach(config.api, (apiConfig, name) => {
        if (!apiConfig.mock) {
            app.use(apiConfig.proxyPrefix, httpProxy(apiConfig.url, {
                forwardPath: function(req, res) {
                    return url.parse(req.url).path;
                }
            }));
        }
    });
});
