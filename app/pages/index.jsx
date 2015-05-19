import React from 'react';
import ActionMain from '../units/core/actions.js';
import StoreMain from '../units/core/store.js';

export default class IndexPage extends React.Component {
    static get contextTypes() {
        return {
            actions: React.PropTypes.object
        };
    }

    get state() {
        let store = new StoreMain('helloStore', 'https://google.com');
        let action = new ActionMain('helloAction');

        action.register(store);
        action.all();

        return {data: store.data};
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}
