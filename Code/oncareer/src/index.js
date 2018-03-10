import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

const script = document.createElement("script");
script.src = "https://apis.google.com/js/platform.js";
document.body.appendChild(script);

const script1 = document.createElement("script"); 
script1.src = "https://apis.google.com/js/api:client.js";

script.onload = () => {
  document.body.appendChild(script1);
  script1.onload = () => {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
  }
}
