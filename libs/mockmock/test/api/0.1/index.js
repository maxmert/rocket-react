var API = {
    title: 'Main API',
    version: '0.1',
    get url() {
        return `/api/v${API.version}`;
    },

    protocols: ['HTTP', 'HTTPS'],
    defaults: {
        responseType: 'application/json'
    },

    traits: require('./traits'),
    securitySchemas: require('./security'),

    routes: {
        '/user': require('./endpoints/user')
    }
};

module.exports = API;
