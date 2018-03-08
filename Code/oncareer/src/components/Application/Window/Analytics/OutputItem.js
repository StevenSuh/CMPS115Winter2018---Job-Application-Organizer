import React, { Component } from 'react';
import classes from './styles.css';

class OutputItem extends Component {
  render() {
	const listData = this.props.listData;

  	return (
	  <div className={`${classes.listing_container}`}>
		<div className={`${classes.listing_item}`}>
	      <div className={`${classes.job_title}`}><a href={listData.link}> {listData.title}</a></div>
          <div className={`${classes.job_company}`}>{listData.company} - </div>
      	  <div className={`${classes.job_location}`}> {listData.location}</div>
		  <div className={`${classes.job_description}`}>{listData.description}</div>
	      <div className={`${classes.job_date}`}>{listData.date}</div>
	      <div className={`${classes.job_clear}`}></div>
        </div>
	  </div>
	);
  }
}

export default OutputItem;