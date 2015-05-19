import React from 'react';
import factory from './core';
import config from './config';
import Logger from './libs/logger';
import Router from 'react-router';
import app from './app/app.jsx';
import layout from './core/layout';
import _ from 'lodash';
import {inspect} from 'util';
import {join} from 'path';

var logger = new Logger('server');
var server = factory(config);

server.engage('compression');
server.engage('statics');
server.engage('proxy');
server.engage('mockmock', join(config.path.base, '/config/api/0.1'));

server.get('*', (req, res) => {
    Router.run(app, (Root) => {
        res.send(layout(React.renderToString(React.createElement(Root))));
    });
});

server.listen(config.port, () => {
    logger.log(`started at port *${config.port}* in *${config.production ? 'production' : 'development'}* mode`);
    _.forEach(config.api, (apiConfig, name) => {
        logger.log(`API \`${name}\` is *${apiConfig.mock ? 'mocked' : apiConfig.url}*`);
    });
});
