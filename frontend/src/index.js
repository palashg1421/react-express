/** Core packages */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

/** Global CSS, JS and packages */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/** App component */
import App from './components/App/App';

/** Rendere */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
