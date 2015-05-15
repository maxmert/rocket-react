import React from 'react';
import Router from 'react-router';

import IndexPage from './pages/index.jsx';

let Route = Router.Route;

export default function(App) {
    return (
        <Route handler={App}>
            <Route path="" handler={IndexPage}/>
        </Route>
    );
}
