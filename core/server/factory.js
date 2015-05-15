import express from 'express';
import Service from './services/service';
import Logger from '../../libs/logger';
import * as services from './services/list';

var logger = new Logger('Server factory');

function extract(service) {
    if (service instanceof Service) {
        return service;
    }

    if (typeof service === 'string' && services[service] instanceof Service) {
        return services[service];
    }

    try {
        var imported = require(service);
        return new Service(imported);
    }
    catch (error) {}
}

export default function factory(config) {
    var app = express();

    app.engage = function(service, props) {
        try {
            extract(service).start(app, config, props);
        }
        catch (error) {
            logger.error(`can't start service <${service}>. Probably it doesn't exist.`);
        }
    };

    return app;
}
