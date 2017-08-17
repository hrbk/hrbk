import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './app.jsx';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
