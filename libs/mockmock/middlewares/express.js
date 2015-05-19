import _ from 'lodash';
import director from 'director';
import util from 'util';

function extractTraits(route) {
    if (route.is) {
        let result = {};

        route.is.forEach((traitName) => {
            let trait = this.getTrait(traitName);
            if (trait) {
                _.merge(result, _.mapValues(trait.queryParameters, (value, key) => {
                    return value.example || value.default;
                }));
            }
        });

        return result;
    }
    else {
        return {};
    }
}

function extractSecure(route) {
    if (route.securedBy) {
        let result = {};
        route.securedBy.forEach((securityName) => {
            let security = this.getSecurity(securityName);
            if (security) {
                _.merge(result, security.describedBy);
            }
        });

        return result;
    }
}

function match(req, secure) {
    if (secure) {
        let secureKeys = _.keys(secure);
        let reqKeys = _.keys(req);

        return _.reject(secureKeys, (key) => {
            return _.indexOf(reqKeys, key) >= 0;
        }).length === 0;
    }
    else {
        return true;
    }
}

function isSecured(req, secure) {
    if (secure) {
        return match(req.headers, secure.headers) && match(req.query, secure.queryParameters);
    }
    else {
        return true;
    }
}

function getResult(req, route) {
    let method = req.method.toLowerCase();
    if (route[method]) {
        return route[method].responses['200'].body['application/json'].example;
    }
}

function exposeToResult(query, params, result) {
    let res = JSON.stringify(result);
    let regexpFormat = '\\${%s}';

    _.forEach(query, function(value, qr) {
        var regexp = new RegExp(util.format(regexpFormat, qr));
        res = res.replace(regexp, value.example || value);
    });

    _.forEach(params, function(value, param) {
        var regexp = new RegExp(util.format(regexpFormat, param));
        res = res.replace(regexp, value.example || value);
    });

    return JSON.parse(res);
}

export default function(req, res, next) {
    let router = new director.http.Router();

    _.forEach(this.routes, (route, name) => {
        router.get(name, () => {
            let traits = extractTraits.call(this, route);
            let sequrities = extractSecure.call(this, route);
            let method = req.method.toLowerCase();

            // Expose only query parameters examples from the API description
            // that we don't have in req.query
            if (route[method] && route[method].queryParameters) {
                let res = {};
                _.forEach(route[method].queryParameters, (value, key) => {
                    if (!req.query[key]) {
                        res[key] = value.example;
                    }
                });

                _.assign(req.query, res);
            }

            _.assign(req.query, traits);

            if (!isSecured(req, sequrities)) {
                res.status(403).send({error: sequrities.responses['403'].description});
            }
            else {
                let result = getResult(req, route);
                if (result) {
                    res.json(exposeToResult(req.query, req.params, result));
                }
                else {
                    res.status(404).send({error: `No such endpoint '${req.url}' with method ${req.method} in mock API.`});
                }
            }
        });
    });

    router.dispatch(req, res, (error) => {
        if (error) {
            next();
        }
    });

}
