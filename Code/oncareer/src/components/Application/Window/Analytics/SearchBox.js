import React, { Component } from 'react';
import classes from './styles.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);    
    this.onSearchClick = this.onSearchClick.bind(this);
  } 

  onSearchClick(event) {
    event.preventDefault();
    const data = {};
    data.term = document.getElementById('term').value;
    data.location = document.getElementById('location').value;
    if(data.term !== '' && data.location !== '') {
      this.props.executeSearch(data, event);
      //set css for jobs list to be visible
    }
  }

  render() {
    return (
      <form className={`${classes.search_container}`}>
        <div className={`${classes.search_field}`}>
          <svg className={classes.search_svg} width="18" height="18" viewBox="0 0 18 18">
            <path d="M 6.5 0C 8.22391 1.77636e-15 9.87721 0.684819 11.0962 1.90381C 12.3152 3.12279 13 4.77609 13 6.5C 13 8.11 12.41 9.59 11.44 10.73L 11.71 11L 12.5 11L 17.5 16L 16 17.5L 11 12.5L 11 11.71L 10.73 11.44C 9.59 12.41 8.11 13 6.5 13C 4.77609 13 3.12279 12.3152 1.90381 11.0962C 0.684819 9.87721 4.44089e-16 8.22391 -8.88178e-16 6.5C -4.44089e-16 4.77609 0.684819 3.12279 1.90381 1.90381C 3.12279 0.684819 4.77609 1.77636e-15 6.5 0ZM 6.5 2C 4 2 2 4 2 6.5C 2 9 4 11 6.5 11C 9 11 11 9 11 6.5C 11 4 9 2 6.5 2Z"/>
          </svg>
          <input className={classes.search_input} type="text" id="term" placeholder="Search Jobs"/>
        </div>
        <div className={`${classes.search_field}`}>
        <svg className={classes.search_svg} width="18" height="18" viewBox="0 0 18 18">
          <path d="M 8.75 5.56818C 9.59387 5.56818 10.4032 5.90341 10.9999 6.50011C 11.5966 7.09682 11.9318 7.90613 11.9318 8.75C 11.9318 9.59387 11.5966 10.4032 10.9999 10.9999C 10.4032 11.5966 9.59387 11.9318 8.75 11.9318C 7.90613 11.9318 7.09682 11.5966 6.50011 10.9999C 5.90341 10.4032 5.56818 9.59387 5.56818 8.75C 5.56818 7.90613 5.90341 7.09682 6.50011 6.50011C 7.09682 5.90341 7.90613 5.56818 8.75 5.56818ZM 1.63068 9.54545L 0 9.54545L 0 7.95455L 1.63068 7.95455C 1.98864 4.6375 4.6375 1.98864 7.95455 1.63068L 7.95455 0L 9.54545 0L 9.54545 1.63068C 12.8625 1.98864 15.5114 4.6375 15.8693 7.95455L 17.5 7.95455L 17.5 9.54545L 15.8693 9.54545C 15.5114 12.8625 12.8625 15.5114 9.54545 15.8693L 9.54545 17.5L 7.95455 17.5L 7.95455 15.8693C 4.6375 15.5114 1.98864 12.8625 1.63068 9.54545ZM 8.75 3.18182C 7.27323 3.18182 5.85694 3.76846 4.8127 4.8127C 3.76846 5.85694 3.18182 7.27323 3.18182 8.75C 3.18182 10.2268 3.76846 11.6431 4.8127 12.6873C 5.85694 13.7315 7.27323 14.3182 8.75 14.3182C 10.2268 14.3182 11.6431 13.7315 12.6873 12.6873C 13.7315 11.6431 14.3182 10.2268 14.3182 8.75C 14.3182 7.27323 13.7315 5.85694 12.6873 4.8127C 11.6431 3.76846 10.2268 3.18182 8.75 3.18182Z"/>
        </svg>

          <input className={classes.search_input} type="text" id="location" placeholder="Location"/>
        </div>
        <div>
          <button className={`${classes.button}`} id="FindJobs" onClick={this.onSearchClick}>Find Jobs</button>
        </div>
      </form>
    );
  }
}

export default SearchBox;