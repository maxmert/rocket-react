const SCHEMA = {
    type: 'object',
    description: 'Cerrent user data',
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string'
        },
        surname: {
            type: 'string'
        },
        nickname: {
            type: 'string'
        },
        full: {
            type: 'boolean'
        }
    }
};

const EXAMPLE = {
    id: 876,
    name: 'Maxim',
    surname: 'Vetrenko',
    nickname: 'maxmert',
    full: '${full}'
};

export default {
    get: {
        is: ['paged'],
        queryParameters: {
            full: {
                description: 'Get full user profile',
                example: 'absolutely'
            }
        },
        responses: {
            200: {
                body: {
                    'application/json': {
                        example: EXAMPLE,
                        schema: SCHEMA
                    }
                }
            }
        }
    }
};
