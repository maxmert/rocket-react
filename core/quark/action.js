import Rx from 'rx';
import * as errors from '../../core/errors';

import Store from './store';

export default class Action {
    constructor(name) {
        if (!Action.validateStrings(name)) {
            throw new errors.type('Action <name>', name, 'Action constructor', 'string');
        }

        this.name = name;
    }

    register(store) {
        this.store = store;
    }

    static validateStrings(...params) {
        let result = true;
        params.forEach(param => result = typeof param === 'string' && result);
        return result;
    }

    static validateStores(...stores) {
        let result = true;
        stores.forEach(store => result = store instanceof Store && result);
        return result;
    }
}
