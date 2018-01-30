import React, { Component } from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';

import Application from './components/Application';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Auth from './components/Login/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                {/* <Route path='/' component = {} /> */}
                <Route path='/' exact component = {Login} />
                {/* <Route path='/login' exact component = {LandingPage} /> */}
                <Route path='/app' exact component = {Application} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
