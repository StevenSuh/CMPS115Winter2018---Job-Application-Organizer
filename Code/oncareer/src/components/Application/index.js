import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import Window from './Window';
import SignIn from '../Login/Login';

import Auth from '../Login/Auth';

const url = "http://localhost:3001/users/acc/";

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      view: 'dashboard', 
      url: 'http://localhost:3001',
      user: ''
    };

    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    if (!Auth.isUserAuthenticated()) {
      this.props.history.push('/');
    }

    const requestURL = url + Auth.getId();
    axios.get(requestURL)
      .then(res => {
        this.setState({ ...this.state, user: res.data[0] });
    });
  }

  updateView(value) {
    this.setState({ ...this.state, view: value });
  }

  render() {
    if (!Auth.isUserAuthenticated()) {
      return (
        <div className="application">
          bye
        </div>
      );
    }

    return (
      <div className="application">
        <SignIn />
        <Sidebar
          compUpdate={this.updateView}
          history={this.props.history}
          compUser={this.state.user}
        />
        <Window
          compView={this.state.view}
          compUser={this.state.user}
        />
      </div>
    );
  }
}

export default withRouter(Application);
