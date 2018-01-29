import React, { Component } from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';

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
                {Auth.isUserAuthenticated() && <Route path='/' exact component = {LandingPage} />}
                {!Auth.isUserAuthenticated() && <Route path='/' exact component = {Login} />}
                <Route path='/login' exact component = {Login} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
