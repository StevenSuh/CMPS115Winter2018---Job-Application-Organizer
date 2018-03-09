import React, { Component } from 'react';

import Dashboard from './Dashboard';

import classes from './styles.css';

import Calendar from './Calendar/Calendar';

import Analytics from './Analytics';

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
          view = <Analytics compUser={this.props.compUser} />
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
