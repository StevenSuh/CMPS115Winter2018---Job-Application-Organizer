import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import Window from './Window';

import Auth from '../Login/Auth';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = { view: 'dashboard' };

    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    if (!Auth.isUserAuthenticated()) {
      this.props.history.push('/');
    }
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
        <Sidebar
          compUpdate={this.updateView}
          history={this.props.history}
        />
        <Window
          compView={this.state.view}
        />
      </div>
    );
  }
}

export default withRouter(Application);
