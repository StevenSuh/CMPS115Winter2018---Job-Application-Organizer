import React, { Component } from 'react';
import logo from './logo.svg';
import LandingPage from './components/LandingPage/LandingPage';

import Application from './components/Application';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Auth from './components/Login/Auth'

class App extends Component {
  render() {
    return (
      <Switch>
          {/* <Route path='/' component = {} /> */}
          <Route path='/' exact component = {LandingPage} />
          <Route path='/app' exact component = {Application} />
      </Switch>
    );
  }
}

export default App;
