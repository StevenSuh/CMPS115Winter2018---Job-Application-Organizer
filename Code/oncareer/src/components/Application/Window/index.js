import React, { Component } from 'react';

import Dashboard from './Dashboard';

import classes from './styles.css';

import Calendar from '../../../containers/Calendar/Calendar';

class Window extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view = <div></div>;

    if (this.props.compUser) {
      switch (this.props.compView) {
        case 'profile':
          break;
        case 'dashboard':
          view = <Dashboard compUser={this.props.compUser} />
          break;
        case 'calendar':
          view = <Calendar compUser={this.props.compUser} />
          break;
        case 'analytics':
          break;
      }
    }

    return (
      <div className={`${classes.window}`}>
        {view}
      </div>
    );
  }
}

export default Window;
