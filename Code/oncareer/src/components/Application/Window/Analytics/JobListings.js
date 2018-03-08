import React, { Component } from 'react';
import classes from './styles.css';
import SearchBox from './SearchBox';
import OutputItem from './OutputItem';
import axios from 'axios';

class JobListings extends Component {

  constructor(props) {
    super(props);    
    this.state = { output: [] };
    this.executeSearch = this.executeSearch.bind(this);
  } 

  executeSearch(data) {
    axios
      .get(`http://localhost:3001/api/search?term=${data.term}&location=${data.location}`)
      .then(response => {
        this.setState({ output: response.data });
      });
  } 

  render() {
    const list = [];
    for (let i = 0; i < this.state.output.length; i++) {
      list.push(
        <OutputItem
          listData={this.state.output[i]}
          key={i}
        />
      );
    }
    return (
      <div>
        <div>
          <SearchBox
          executeSearch={this.executeSearch}
          />
        </div>
        <div className={`${classes.jobs_container}`} id="JobList">
          {list}
        </div>
      </div>
    );  
  }
}

export default JobListings;