import React, { Component } from 'react';
import classes from './styles.css';
import SearchBox from './SearchBox';
import OutputItem from './OutputItem';
import axios from 'axios';

import url from '../../../../url';

class JobListings extends Component {

  constructor(props) {
    super(props);    
    
    this.state = { terms: {}, output: [], searching: false, loadMore: false };
    
    this.executeSearch = this.executeSearch.bind(this);
    this.onJobsScroll = this.onJobsScroll.bind(this);
  } 

  executeSearch(data, event) {
    this.setState({ ...this.state, searching: true });
    axios.get(`${url}api/search?term=${data.term}&location=${data.location}&offset=${this.state.output.length}`)
      .then(response => {
        if (response.data) {

          const items = [];
          const list = response.data;

          for (let i = 0; i < list.length; i++) {
            if (list[i]) {
              items.push(
                <OutputItem
                  listData={list[i]}
                  key={list[i].link+i}
                />
              );
            }
          }

          if (event) {
            this.container.scrollTo(0,0);
            this.setState({ ...this.state, searching: false, loadMore: false, output: items, terms: data });
          } else {
            this.setState({ ...this.state, searching: false, loadMore: false, output: this.state.output.concat(items), terms: data });
          }
        } else {
          this.setState({ ...this.state, searching: false, loadMore: false, output: [], terms: data });
        }
      });
  } 

  onJobsScroll(event) {
    const loadHeight = 100;
    const currentTarget = event.currentTarget;
    const height = currentTarget.scrollHeight-currentTarget.offsetHeight;

    if (!this.state.loadMore && !this.state.searching) {
      if (currentTarget.scrollTop >= height-loadHeight) {
        this.setState({ ...this.state, loadMore: true });
        this.executeSearch(this.state.terms);
      }
    }
  }

  load = (
    <div className={classes.listing_container}>
      <div className={`${classes.showbox} ${classes.listing_item}`}>
        <div className={classes.loading}>
          <div className={classes.circle}/>
        </div>
      </div>
    </div>
  );

  render() {
    const list = this.state.output.slice();

    if (!this.state.searching && !list.length) {
      list.push(
        <div className={classes.jobs_noJob} key={0}>
          No Result
        </div>
      );
    }

    return (
      <div>
        <div>
          <SearchBox
          executeSearch={this.executeSearch}
          />
        </div>
        <div className={`${classes.jobs_container}`} id="JobList"
          onScroll={this.onJobsScroll}
          ref={input => { this.container = input; }}
        >
          {list}
          {this.state.searching || list.length > 1 ? this.load : ''}
        </div>
      </div>
    );  
  }
}

export default JobListings;