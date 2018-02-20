import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import JobDetail from './jobdetail';

import classes from './styles.css';

class JobApp extends Component {
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
          compItem={this.props.compItem}
          compBoard={this.props.compBoard}
          options={this.props.options}
          compIndex={this.props.compIndex}
          compClick={this.onModalClose}
          addJob={this.props.addJob}
          deleteJob={this.props.deleteJob}
        />, 
        document.getElementById('modal')
      );
    } else {
      ReactDOM.render(null, document.getElementById('modal'));
    }
  }

  render() {
    const item = this.props.compItem;

    this.renderDetail();
    return (
      <div 
        className={`${classes.job_item}`}
        onClick={this.onButtonClick}
      >
        <img className={`${classes.logo}`} src={item.logo} alt={item.company} />

        <div className={`${classes.info}`}>
          <h6 className={`${classes.job_company}`}>
            {item.company}
          </h6>

          <p className={`${classes.job_title}`}>
            {item.title}
          </p>
        </div>

        <p className={`${classes.date}`}>
          {item.date}
        </p>
      </div>
    );
  }
}

export default JobApp;