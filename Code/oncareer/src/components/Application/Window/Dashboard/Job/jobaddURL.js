import React, { Component } from 'react';
import axios from 'axios';

import classes from './styles.css';

// this.props.job_item

class JobAddURL extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  onInputChange(event) {
    this.setState({ url: event.target.value });
  }

  onSkipClick(event) {
    event.preventDefault();
    this.props.showDetail();
  }

  async onNextClick(event) {
    event.preventDefault();
    if (this.state.url) {
      const result = await axios.get(`http://localhost:3001/api/parsing?url=${this.state.url}`);

      this.props.showDetail(result.data);
    } else {
      event.target.parentElement[0].classList.add(classes.error);      
    }
  }

  render() {
    return (
      <div className={classes.job_detail_form}>
        <h4>Enter job posting URL</h4>
        
        <form>
          <div className={classes.job_detail_input_wrapper}>
            <label>URL</label>
            <input name="url" type="text" value={this.state.url} onChange={this.onInputChange} />
            <p className={classes.job_detail_note}>Only supports job postings from Indeed.com.</p>
          </div>

          <button className={classes.job_detail_button_url}
            style={{ margin: '0 20px 0 10px' }}
            onClick={this.onNextClick}
          >
            Next
          </button>

          <button className={classes.job_detail_button_url}
            onClick={this.onSkipClick}
          >
            Skip
          </button>
        </form>
      </div>
    );
  }
}

export default JobAddURL;