module.exports = {
    oauth: {
        description: 'Application supports OAuth 2.0 for authenticating all API requests.',
        type: 'OAuth 2.0',
        describedBy: {
            headers: {
                authorization: {
                    description: 'Used to send a valid OAuth 2 access token. Do not use with the "access_token" query string parameter.',
                    type: 'string'
                }
            },
            queryParameters: {
                accessToken: {
                    description: 'Used to send a valid OAuth 2 access token. Do not use together with the "Authorization" header',
                    type: 'string'
                }
            },
            responses: {
                401: {
                    description: 'Bad or expired token. This can happen if the user or Application revoked or expired an access token. To fix, you should re-authenticate the user.'
                },
                403: {
                    description: 'Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won\'t help here.'
                }
            }
        }
    }
};
