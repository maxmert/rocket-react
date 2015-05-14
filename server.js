import React from 'react';
import factory from './core';
import config from './app/config';
import Logger from './libs/logger';
import Router from 'react-router';
import app from './app/app.jsx';
import layout from './core/layout';

var logger = new Logger('server');
var server = factory(config);

server.engage('compression');
server.engage('statics');

server.get('*', (req, res) => {
    Router.run(app, (Root) => {
        res.send(layout(React.renderToString(React.createElement(Root))));
    });
});

server.listen(config.port, () => {
    logger.log(`started at port *${config.port}* in *${config.production ? 'production' : 'development'}* mode \n\n`)
});
