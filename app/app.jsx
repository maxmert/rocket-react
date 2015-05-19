import React from 'react';
import Router from 'react-router';
import Routes from './router.jsx';

import context from './context.jsx';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
    static get childContextTypes() {
        return {
            actions: React.PropTypes.object
        };
    }

    getChildContext() {
        return context;
    }

    render() {
        return (
            <div>
                <RouteHandler/>
            </div>
        );
    }
}

export default Routes(App);
