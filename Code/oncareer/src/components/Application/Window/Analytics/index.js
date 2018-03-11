import React, { Component } from 'react';
import JobListings from './JobListings';
import Graph from "./Graph";
import classes from './styles.css';

class Analytics extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    console.log('compUser:', this.props.compUser);
    return (
      <div className={classes.analytics}>
        <h2 style={{ padding: 0, margin: '0 0 25px', fontSize: '27px', fontWeight: 500 }}>
          {this.props.compUser.user_name ? this.props.compUser.user_name + "'s Analytics" : ''}
        </h2>
        <div>
          <Graph />
          <br/>
          <JobListings />
        </div>
      </div>
    );
  }
}

export default Analytics;