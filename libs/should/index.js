import _ from 'lodash';

export function have(list, required) {
    return _.intersection(_.keys(list), required).length;
}
