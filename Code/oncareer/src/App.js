/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import logo from './logo.svg';
import LandingPage from './components/LandingPage/LandingPage';

import Application from './components/Application';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Auth from './components/Login/Auth';

import '!style-loader!css-loader!./transition.css';

import axios from 'axios';
window.axios = axios;
window.Auth = Auth;

class App extends Component {
  render() {
    return (
      <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={{ enter: 300, exit: 200 }}
              appear={true}
              enter={true}
              leave={true}
            > 
              <Switch location={location}>
                  {/* <Route path='/' component = {} /> */}
                  <Route path='/' exact component = {LandingPage} />
                  <Route path='/app' exact component = {Application} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
