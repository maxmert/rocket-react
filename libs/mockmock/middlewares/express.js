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

function match(bigObject, smallObject) {
    let smallObjectKeys = _.keys(smallObject);
    let bigObjectKeys = _.keys(bigObject);

    return _.reject(smallObjectKeys, (key) => {
        return _.indexOf(bigObjectKeys, key) >= 0;
    }).length === 0;
}

function isSecured(req, secure) {
    return match(req.headers, secure.headers) && match(req.query, secure.queryParameters);
}

function getResult(route) {
    return route.responses['200'].body['application/json'].example;
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

            _.assign(req.query, traits);

            if (!isSecured(req, sequrities)) {
                res.status(403).send({error: sequrities.responses['403'].description});
            }
            else {
                res.json(exposeToResult(req.query, req.params, getResult(route)));
            }
        });
    });

    router.dispatch(req, res, (error) => {
        if (error) {
            res.writeHead(404);
            res.json(error.body);
        }
    });

}
