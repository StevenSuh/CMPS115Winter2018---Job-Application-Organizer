import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import JobDetail from './jobdetail';

import classes from './styles.css';

class JobAdd extends Component {
  constructor(props) {
    super(props);

    this.state = { showDetail: false };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onButtonClick() {
    this.setState({ showDetail: true });
  }

  onModalClose() {
    this.setState({ showDetail: false });
  }

  renderDetail() {
    if (this.state.showDetail) {
      ReactDOM.render(
        <JobDetail 
          compBoard={this.props.compBoard}
          compClick={this.onModalClose}
          options={this.props.options}
          addJob={this.props.addJob}
        />, 
        document.getElementById('modal')
      );
    } else {
      ReactDOM.render(null, document.getElementById('modal'));
    }
  }

  render() {
    this.renderDetail();
    return (
      <div 
        className={`${classes.job_add} ${classes.job_item}`}
        onClick={this.onButtonClick}
      >
        +
      </div>
    );
  }
}

export default JobAdd;