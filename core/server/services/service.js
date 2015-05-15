import * as should from '../../../libs/should';
import * as error from '../../errors';

export default class Service {
    constructor(service) {
        if (!service) {
            throw new error.required('service', 'service constructor.');
        }

        this.service = service;
    }

    start(app, config, props) {
        this.service.call(null, app, config, props);
    }
}
