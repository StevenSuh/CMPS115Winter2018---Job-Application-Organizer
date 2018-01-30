import React, { Component } from 'react';

import Dashboard from './Dashboard';

import classes from './styles.css';

import axios from 'axios';
import Auth from '../../Login/Auth';

const url = "http://localhost:3001/users/acc/";

class Window extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };
  }

  componentDidMount() {
    const requestURL = url + Auth.getId();
    axios.get(requestURL)
      .then(res => {
        this.setState({ ...this.state, user: res.data[0] });
    });
  }

  render() {
    let view = <div></div>;

    switch (this.props.compView) {
      case 'profile':
        break;
      case 'dashboard':
        view = <Dashboard compUser={this.state.user} />
        break;        
      case 'calendar':
        break;
      case 'analytics':
        break;
    }

    return (
      <div className={`${classes.window}`}>
        {view}
      </div>
    );
  }
}

export default Window;