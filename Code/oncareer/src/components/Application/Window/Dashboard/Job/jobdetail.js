/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import Select from 'react-select';
import JobAddURL from './jobaddURL';

import '!style-loader!css-loader!react-select/dist/react-select.css';
import classes from './styles.css';


// this.props.job_item

class JobDetail extends Component {
  constructor(props) {
    super(props);

    const compItem = this.props.compItem || {};
    this.state = { 
      category: this.props.compBoard,
      title: compItem.title || '',
      company: compItem.company || '',
      logo: compItem.logo || '',
      date: compItem.date || '',
      description: compItem.description || '',
      index: this.props.compIndex || 0,
      showUrl: !Boolean(this.props.compIndex)
    };

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onUrlSwitch = this.onUrlSwitch.bind(this);
  }

  onOverlayClick(event) {
    if (event.target === event.currentTarget) {
      this.props.compClick();
    }
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteJob(this.state.index);
    this.overlay.click();
  }

  onSaveClick(event) {
    event.preventDefault();
    const form = event.target.parentElement;

    let error = false;
    const data = {};
    for (let i = 1; i < form.length-2; i++) {
      if (form[i].value) {
        data[form[i].name] = form[i].value;
        form[i].classList.remove('error');
      } else {
        error = true;
        form[i].classList.add('error');
      }
    }
    if (error) {
      return;
    }
    // add to our current job stack
    const category = (this.state.category === this.props.compBoard) ? '' : this.state.category;
    this.props.addJob(data, this.state.index, category);

    // close
    this.overlay.click();
  }

  onInputChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onSelectChange(selectedOption) {
    this.setState({ ...this.state, category: selectedOption.value });
  }

  onUrlSwitch(result) {
    if (result) {
      this.setState({
        category: this.state.category,
        title: result.title,
        company: result.company,
        logo: result.logo,
        date: result.date,
        description: result.description,
        index: this.state.index,
        showUrl: false
      });
    } else {
      this.setState({ ...this.state, showUrl: false });
    }
  }

  render() {
    let form = (
      <div className={classes.job_detail_form}>
        <h4>Enter details</h4>

        <div className={classes.job_detail_close} onClick={() => this.overlay.click()}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M 14 1.41L 12.59 0L 7 5.59L 1.41 0L 0 1.41L 5.59 7L 0 12.59L 1.41 14L 7 8.41L 12.59 14L 14 12.59L 8.41 7L 14 1.41Z"/>
          </svg>
        </div>

        <form>
          <div className={classes.job_detail_input_wrapper}>
            <label>Category</label>
            <Select className={classes.category} options={this.props.options} onChange={this.onSelectChange} value={this.state.category} />
          </div>

          <div className={classes.job_detail_input_wrapper}>
            <label>Title</label>
            <input name="title" type="text" value={this.state.title} onChange={this.onInputChange} />
          </div>

          <div className={classes.job_detail_input_wrapper}>
            <label>Company</label>
            <input name="company" type="text" value={this.state.company} onChange={this.onInputChange} />
          </div>

          <div className={classes.job_detail_input_wrapper}>
            <label>Logo URL</label>
            <input name="logo" type="text" value={this.state.logo} onChange={this.onInputChange} />
          </div>

          <div className={classes.job_detail_input_wrapper}>
            <label>Date</label>
            <input name="date" type="date" value={this.state.date} onChange={this.onInputChange} />
          </div>

          <div className={classes.job_detail_input_wrapper}>
            <label>Description</label>
            <textarea name="description" rows="5" value={this.state.description} onChange={this.onInputChange} />
          </div>

          <button className={classes.job_detail_button_url}
            style={{ margin: '0 20px 0 10px' }}
            onClick={this.onSaveClick}
          >
            Save
          </button>

          <button className={`${classes.job_detail_button_url} ${this.state.index ? '' : classes.hide}`}
            onClick={this.onDeleteClick}
          > 
            Delete
          </button>
        </form>
      </div>
    );
    if (this.state.showUrl) {
      form = (
        <JobAddURL 
          showDetail={this.onUrlSwitch}
        />
      );
    }
    return (
      <div 
        className={`${classes.job_detail_overlay}`}
        onClick={this.onOverlayClick}
        ref={input => {this.overlay = input;}}
      >
        {form}
      </div>
    );
  }
}

export default JobDetail;