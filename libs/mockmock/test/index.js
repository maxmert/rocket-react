import should from 'should';
import request from 'supertest';
import express from 'express';
import path from 'path';
import * as Errors from '../errors';

import Mockmock from '../index';

describe('Mockmock', () => {
    let app;
    let apiPath;
    let mockmock;
    let makeRequest;
    let makeSecureRequest;
    let testRequest;

    beforeEach(() => {
        app = express();
        apiPath = path.join(__dirname, './api/0.1');
        mockmock = new Mockmock(apiPath);

        makeRequest = function(done) {
            request(app)
                .get('/api/v0.1/user')
                .set('Accept', 'application/json')
                .end(function(err, r) {
                    if (err) {
                        throw err;
                    }

                    testRequest = r;
                    done();
                });
        };

        makeSecureRequest = function(done) {
            request(app)
                .get('/api/v0.1/user')
                .set('Authorization', 'kHOVLIWEBIniubeiub78687abekfjbkUBIb')
                .query({
                    accessToken: 'BWIUBEWIVNIWEVN',
                    full: 'absolutely'
                })
                .set('Accept', 'application/json')
                .end(function(err, r) {
                    if (err) {
                        throw err;
                    }

                    testRequest = r;
                    done();
                });
        };
    });

    describe('creating instance', () => {
        it('should create throw an error if path to mock API is not provided', () => {
            (() => {
                mockmock = new Mockmock();
            }).should.throw(Errors.required);
        });

        it('should create throw an error if provided path to mock API is not a string', () => {
            (() => {
                mockmock = new Mockmock(123);
            }).should.throw(Errors.type);
        });
    });

    describe('routes', () => {
        it('builder should throw if there are no routes in the ruleset', () => {
            (() => {
                let brokenApiPath = path.join(__dirname, './api/0.1/broken/no-routes');
                mockmock = new Mockmock(brokenApiPath);
            }).should.throw();
        });

        it('should be initialized', () => {
            should.exists(mockmock.routes);
        });
    });

    describe('traits', () => {
        it('should be initialized', () => {
            should.exists(mockmock.traits);
        });

        it('should throw if unexisting getting trait', () => {
            (() => {
                mockmock.getTrait('one');
            }).should.throw();
        });

        it('should return trait by name', () => {
            mockmock.getTrait('paged').should.have.type('object');
        });
    });

    describe('security', () => {
        it('should be initialized', () => {
            should.exists(mockmock.security);
        });

        it('should throw if unexisting getting security schema', () => {
            (() => {
                mockmock.getSecurity('one');
            }).should.throw();
        });

        it('should return security schema by name', () => {
            mockmock.getSecurity('oauth').should.have.type('object');
        });
    });

    describe('middleware', () => {
        it('should initialize', () => {
            app.use(mockmock.middleware);
            makeSecureRequest(function() {
                testRequest.status.should.be.equal(200);
                testRequest.body.id.should.be.equal(876);
                testRequest.body.full.should.be.equal('absolutely');
            });
        });
    });
});
