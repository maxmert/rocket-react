import Rx from 'rx';
import * as errors from '../../../core/errors';
import Action from '../../../core/quark/action';

export default class ActionMain extends Action {
    all() {
        this.store.observable.subscribe(Rx.Observer.create(
            (data) => {
                this.store.set(data);
            },

            (error) => {
                console.log(`Error: ${error}`);
            },

            () => {
                console.log('Complete');
            }

        ));
    }
}
