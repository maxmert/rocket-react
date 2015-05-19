module.exports = {
    paged: {
        queryParameters: {
            pages: {
                description: 'The number of pages',
                type: 'number',
                required: false,
                default: 1,
                example: 2000
            },
            offset: {
                description: 'Pages offset',
                type: 'number',
                required: false,
                default: 0,
                example: 10
            },
            limit: {
                description: 'Limit of records per request',
                type: 'number',
                required: false,
                default: 20,
                example: 30
            }
        }
    }
};
