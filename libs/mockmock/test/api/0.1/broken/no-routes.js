var API = {
    title: 'Main API',
    version: '0.1',
    get url() {
        return `/api/${API.version}`;
    },

    protocols: ['HTTP', 'HTTPS'],
    defaults: {
        responseType: 'application/json'
    },

    get traits() {
        return require('../traits');
    },

    get securitySchemes() {
        return require('../security');
    }
};

module.exports = API;
