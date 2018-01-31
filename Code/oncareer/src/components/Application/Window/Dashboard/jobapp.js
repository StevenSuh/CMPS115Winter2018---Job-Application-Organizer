import React, { Component } from 'react';

import classes from './styles.css';

class JobApp extends Component {
  render() {
    const item = this.props.compItem;

    return (
      <div className={`${classes.job_item}`}>
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