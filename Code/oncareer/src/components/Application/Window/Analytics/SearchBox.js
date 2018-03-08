import React, { Component } from 'react';
import classes from './styles.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);    
    this.onSearchClick = this.onSearchClick.bind(this);
  } 

  onSearchClick() {
    const data = {};
    data.term = document.getElementById('term').value;
    data.location = document.getElementById('location').value;
    if(data.term != '' && data.location != '') {
      this.props.executeSearch(data);
      //set css for jobs list to be visible
    }
  }

  render() {
    return (
      <div className={`${classes.search_container}`}>
        <div className={`${classes.search_field}`}>
          <input type="text" id="term" placeholder="Search Jobs"/>
        </div>
        <div className={`${classes.search_field}`}>
          <input type="text" id="location" placeholder="Location"/>
        </div>
        <div>
          <button className={`${classes.button}`} id="FindJobs" onClick={this.onSearchClick}>Find Jobs</button>
        </div>
      </div>
    );
  }
}

export default SearchBox;