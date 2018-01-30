import React, { Component } from 'react';

import classes from './styles.css';

class JobAdd extends Component {
  render() {
    return (
      <div className={`${classes.job_add} ${classes.job_item}`}>
        +
      </div>
    );
  }
}

export default JobAdd;