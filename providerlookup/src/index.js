import 'react-app-polyfill/ie11'; //needed for the page to render in IE
import 'react-app-polyfill/stable'; //needed for the page to render in IE
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));