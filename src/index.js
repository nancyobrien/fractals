import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import provider from './reduxProvider';

ReactDOM.render(provider(<App />), document.getElementById('app'));