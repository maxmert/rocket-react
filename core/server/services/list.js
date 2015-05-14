import express from 'express';
import Service from './service.js';

var statics = new Service((app, config) => {
    app.use(express.static(config.path.static.env));
});

export {statics};
