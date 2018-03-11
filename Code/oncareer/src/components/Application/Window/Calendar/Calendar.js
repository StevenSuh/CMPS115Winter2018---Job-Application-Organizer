/* global gapi */
/* eslint import/no-webpack-loader-syntax: off */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import classes from './Calendar.css';

import EventDetail from './eventDetail';

import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

// google timestamp pattern:
// moment(time).utc().format();

// react-big-calendar timestamp pattern:
// new Date(time)

require('./Calendar.css');
BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [], //events
      calendars: [],
      showDetail: false,
      currEvent: -1
    }

    //initialize functions
    this.renderDetail = this.renderDetail.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.cancelPopUp = this.cancelPopUp.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  //connect to calendar google api
  componentDidMount() {
    gapi.client.load('calendar', 'v3', () => {
      // connected
      console.log('gapi calendar connected!!!');

      // click 'today'
      document.getElementsByClassName('rbc-btn-group')[0].children[0].click();
      this.onViewChange();
    });
  }
  //turn off showDetail in state, this removes popup modal for creationf of events
  cancelPopUp() {
    this.setState({ ...this.state, showDetail: false });
  }

  //Grabs start and end time from event info which is returned from the user
  //mouse movement. All data put into newEvent object and added to state
  //and pushed to Google API
  addEvent(eventInfo){
    console.log(eventInfo);
    var startT = new Date(eventInfo.start);
    var endT = new Date(eventInfo.end);

    if (startT.toString() === endT.toString()) {
      endT = endT.setDate(endT.getDate() + 1);
    }

    console.log('indata');
    var newEvent = {
      title: '',
      start: startT,
      end: endT,
      description: '',
      index: this.state.events.length,
      Location: eventInfo.type || 'Other'
    };
    const newState = { ...this.state, currEvent: newEvent.index, showDetail: true };
    newState.events.push(newEvent);

    this.setState(newState);
  }

  //if an event is found in the state / google api events, upon pressing delete
  //the event detail component, the event will be removed from google and state.
  // the modal will also be closed.
  deleteEvent(exists){
    const newState = { ...this.state, currEvent: -1, showDetail: false };
    const deleted = newState.events[this.state.currEvent];
    newState.events[this.state.currEvent] = null;
    console.log('deleted:', deleted);

    if (exists) {
      const itemRequest = gapi.client.calendar.events.delete({
        calendarId: this.props.compUser.user_email,
        eventId: deleted.g_id
      });

      itemRequest.execute(() => {
        this.setState(newState);
      });
    } else {
      this.setState(newState);
    }
  }

  //After clicking on a previously made event,
  // new modified start/end/description/title/category will be saved and
  //pushed to state and google calendars db.
  updateEvent(data) {
    const newState = { ...this.state, showDetail: false };
    newState.events[newState.currEvent] = data;

    const googleEvent = {
      summary: data.title,
      start: {
        dateTime: moment(data.start).utc().format()
      },
      end: {
        dateTime: moment(data.end).utc().format()
      },
      description: data.description,
      location: data.type //def required
    }

    let itemRequest;
    if (!data.g_id) {
      itemRequest = gapi.client.calendar.events.insert({
        calendarId: this.props.compUser.user_email
      }, googleEvent);
    } else {
      itemRequest = gapi.client.calendar.events.update({
        calendarId: this.props.compUser.user_email,
        eventId: data.g_id
      }, googleEvent);
    }

    itemRequest.execute(data => {
      console.log('Updated event!');
      this.setState(newState);
    });
  }

  //Whenever switched from weekly, monthly, e.t.c view we reload the events
  onViewChange() {
    const d = new Date();

    const itemRequest = gapi.client.calendar.events.list({
      calendarId: this.props.compUser.user_email
    });
    itemRequest.execute(({ items }) => {
      const eventData = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].start) {
          const startT = items[i].start.dateTime || items[i].start.date;
          const endT = items[i].end.dateTime || items[i].end.date;

          eventData.push({
            title: items[i].summary,
            start: new Date(startT),
            end: new Date(endT),
            description: items[i].description,
            index: eventData.length,
            g_id: items[i].id,
            type: items[i].location,

          });
        }
      }
      this.setState({ ...this.state, events: eventData });
    });
  }

  //when you click on an event the showDetail / eventDetail modal will pop up
  //as we modify this to true in the state. also grab the event info and preload
  //it into the modal
  onEventClick(eventInfo) {
    console.log('eventInfo:', eventInfo);
    this.setState({ ...this.state, currEvent: eventInfo.index, showDetail: true });
  }
  // this checks all of the events and sets the color of the event based on the
  //category /type of event that was or is made.
  eventStyleGetter(event, start, end, isSelected) {
    console.log('eventStyle:', event);
    var backgroundColor = '#' + 'FFFFF';
    if(event.type === 'Other'){
      backgroundColor = '#757575';
    }
    if(event.type === 'Decision Deadline'){
      backgroundColor = '#F44336';
    }
    if(event.type === 'Coding Challenge Deadline'){
      backgroundColor = '#FFCA28';
    }
    if(event.type === 'Phone Interview'){
      backgroundColor = '#81C784';
    }
    if(event.type === 'On-site Interview'){
      backgroundColor = '#2196F3';
    }
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '10px',
        opacity: 0.95,
        color: 'white',
        border: '0px',
        display: 'block',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    };

    return {
        style: style
    };

  }

  //Render / display the eventdetail modal / component to modify event details
  renderDetail() {
    if (this.state.showDetail) {
      ReactDOM.render(
        <EventDetail
          compEvent={this.state.events[this.state.currEvent]}
          compUpdate={this.updateEvent}
          compDelete={this.deleteEvent}
          compClick={this.cancelPopUp}
        />,
        document.getElementById('modal')
      );
    } else {
      ReactDOM.render(null, document.getElementById('modal'));
    }
  }

  //jsx code to render the react-big-calendar.
  render() {
    console.log(this.state.events);
    this.renderDetail();
    return (
      <div className={classes.calendar} style={{ width: '100%', height: '100%' }}>
        <h2 style={{ padding: 0, margin: '0 0 25px', fontSize: '27px', fontWeight: 500 }}>
          {this.props.compUser.user_name ? this.props.compUser.user_name + "'s Calendar" : ''}
        </h2>
        <BigCalendar
          selectable
          defaultView="week"
          events={this.state.events}
          step={30}
          style={{height: '75%',
                  width: '80%'}}
          onSelectSlot={this.addEvent}
          onNavigate={(date) => console.log(date)}
          onSelectEvent={this.onEventClick}
          eventPropGetter={(this.eventStyleGetter)}
          //onEventDrop={this.moveEvent}
          //resizable
          //onEventResize={this.resizeEvent}
        />
      </div>
    )
  }
}

export default Calendar;
