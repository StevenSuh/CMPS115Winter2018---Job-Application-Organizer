import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

const script = document.createElement("script");
script.src = "https://apis.google.com/js/platform.js";
document.body.appendChild(script);

script.onload = () => {
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
}

registerServiceWorker();
