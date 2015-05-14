import React from 'react';
import Router from 'react-router';
import Routes from './router.jsx';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
    render() {
        return (
            <div>
                <RouteHandler/>
            </div>
        )
    }
}

export default Routes(App);
