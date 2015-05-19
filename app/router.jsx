import React from 'react';
import Router from 'react-router';

import IndexPage from './pages/index.jsx';
import NotFoundPage from './pages/not-found.jsx';

let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;
let DefaultRoute = Router.DefaultRoute;

export default function(App) {
    return (
        <Route path="/" handler={App}>
            <DefaultRoute handler={IndexPage} />

            <NotFoundRoute handler={NotFoundPage} />
        </Route>
    );
}
