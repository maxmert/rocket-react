import React from 'react';
import Router from 'react-router';
import app from './app/app.jsx';

Router.run(app, Router.HistoryLocation, (Root) => {
  React.render(React.createElement(Root), document.getElementById('app'));
});
