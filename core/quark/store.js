import fetch from 'request-promise';
import Rx from 'rx';
import {EventEmitter} from 'events';

import * as errors from '../../core/errors';

export default class Store extends EventEmitter {
    constructor(name, url) {
        super();

        if (!Store.validateStrings(name)) {
            throw new errors.type('Store <name>', name, 'Store constructor', 'string');
        }

        this.name = name;

        if (!Store.validateStrings(url)) {
            throw new errors.type('Store <url>', url, `Store '${name}' constructor`, 'string');
        }

        this.url = url;
        this.observable = Rx.Observable.fromPromise(fetch(this.url));
    }

    set(data) {
        this.data = data;
        this.emit('update', data);
        console.log('Data setted');
    }

    static validateStrings(...params) {
        let result = true;
        params.forEach(param => result = typeof param === 'string' && result);
        return result;
    }

}
