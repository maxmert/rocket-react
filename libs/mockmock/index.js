import _ from 'lodash';
import * as Errors from './errors';
import * as validate from '../../core/validators';
import path from 'path';

import middleware from './middlewares/express';

export default class Mockmock {
    constructor(pathToRules) {
        if (!pathToRules) {
            throw new Errors.required('Path to the Mockmock ruleset', 'Mockmock constructor');
        }

        if (!validate.strings(pathToRules)) {
            throw new Errors.type('Path to the Mockmock ruleset', pathToRules, 'Mockmock constructor', 'srting');
        }

        let api;
        try {
            api = require(pathToRules);
        }
        catch (error) {
            throw new Error(`Couldn't find Mockmock ruleset '${pathToRules}'. Please, check the path.`);
        }

        this.routes = Mockmock.parseRoutes(api);
        this.traits = Mockmock.parseTraits(api);
        this.security = Mockmock.parseSecurity(api);
    }

    getTrait(name) {
        if (!this.traits) {
            throw new Errors.exist(`Traits`, 'traits getter', 'Probably you use traits in some endpoints, but did not described them.');
        }

        if (!this.traits[name]) {
            throw new Errors.exist(`Trait '${name}'`, 'traits getter', `Probably you use trait '${name}' in some endpoints, but did not described it.`);
        }

        return this.traits[name];
    }

    getSecurity(name) {
        if (!this.security) {
            throw new Errors.exist(`Traits`, 'sequrity getter', 'Probably you use sequrity in some endpoints, but did not described them.');
        }

        if (!this.security[name]) {
            throw new Errors.exist(`Sequrity '${name}'`, 'sequrity getter', `Probably you use sequrity schema '${name}' in some endpoints, but did not described it.`);
        }

        return this.security[name];
    }

    get middleware() {
        return middleware.bind(this);
    }

    // ================================= STATIC =================================

    static parseRoutes(api) {
        if (!api.routes) {
            throw new Error(`Couldn't find <routes> field in Mockmock ruleset. Please, add a field <routes>, you can keep it empty.`);
        }

        return _.mapKeys(api.routes, (value, route) => path.join(api.url, route));
    }

    static parseTraits(api) {
        return api.traits;
    }

    static parseSecurity(api) {
        return api.securitySchemas;
    }
}
