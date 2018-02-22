import React, { Component } from 'react';
import moment from 'moment';

import classes from './Calendar.css';

class EventDetail extends Component {
  constructor(props) {
    super(props);

    const compEvent = this.props.compEvent;

    this.state = {
      title: compEvent.title || '',
      start: moment(compEvent.start || '').format('YYYY-MM-DDTHH:mm'),
      end: moment(compEvent.end || '').format('YYYY-MM-DDTHH:mm'),
      description: compEvent.description || '',
      index: compEvent.index || '',
      g_id: compEvent.g_id || ''
    };

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onOverlayClick(event) {
    if (event.target === event.currentTarget) {
      this.props.compClick();
    }
  }

  onInputChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onSaveClick(event) {
    event.preventDefault();

    const form = event.target.parentElement;

    if (!this.state.title) {
      form[0].classList.add(classes.error);
      return;
    }

    const data = { ...this.state };
    data.start = new Date(data.start);
    data.end = new Date(data.end);
    this.props.compUpdate(data);

    this.overlay.click();
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.compDelete();
    this.overlay.click();
  }

  render() {
    return (
      <div
        className={classes.event_detail_overlay}
        onClick={this.onOverlayClick}
        ref={input => {this.overlay = input;}}
      >
        <div className={classes.event_detail_form}>
          <h4>Enter details</h4>

          <div className={classes.event_detail_close} onClick={() => this.overlay.click()}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M 14 1.41L 12.59 0L 7 5.59L 1.41 0L 0 1.41L 5.59 7L 0 12.59L 1.41 14L 7 8.41L 12.59 14L 14 12.59L 8.41 7L 14 1.41Z"/>
            </svg>
          </div>

          <form>
            <div className={classes.event_detail_input_wrapper}>
              <label>Title</label>
              <input 
                type="text" 
                value={this.state.title} 
                name="title" 
                onChange={this.onInputChange}
              />
            </div>

            <div className={classes.event_detail_input_wrapper}>
              <label>Start</label>
              <input 
                type="datetime-local" 
                value={this.state.start} 
                name="start" 
                onChange={this.onInputChange}
              />
            </div>

            <div className={classes.event_detail_input_wrapper}>
              <label>End</label>
              <input 
                type="datetime-local" 
                value={this.state.end} 
                name="end" 
                onChange={this.onInputChange}
              />
            </div>

            <div className={classes.event_detail_input_wrapper}>
              <label>Description</label>
              <textarea 
                rows="5" 
                value={this.state.description} 
                name="description" 
                onChange={this.onInputChange}
              />
            </div>

            <button className={classes.event_detail_button_url}
              style={{ margin: '0 20px 15px 10px' }}
              onClick={this.onSaveClick}
            >
              Save
            </button>

            <button className={classes.event_detail_button_url}
              onClick={this.onDeleteClick}
            >
              {this.props.compEvent.title ? 'Delete' : 'Cancel'}
            </button>
          </form>
        </div>

      </div>
    );
  }
}

export default EventDetail;