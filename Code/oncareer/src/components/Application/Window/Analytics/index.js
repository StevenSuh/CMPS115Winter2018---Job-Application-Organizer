import React, { Component } from 'react';
import JobListings from './JobListings'

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = { graph: [], jobs: [] };
  }

  componentDidMount() {
    const joblistings = [];

      joblistings.push(
        <JobListings/>
      );

    this.setState({ jobs: this.state.jobs.concat(joblistings) });
  }

  render() {
    console.log('compUser:', this.props.compUser);
    return (
      <div>
        <h2>
          {"Analytics"}
        </h2>
        <div>
          {this.state.jobs}
        </div>
      </div>
    );
  }
}

export default Analytics;