/* global gapi */
/* eslint import/no-webpack-loader-syntax: off */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//import './Calendar.css';
//import 'react-big-calendar/lib/css/react-big-calendar.css';

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
      events: [],
      calendars: [],
      showDetail: false,
      currEvent: -1
    }

    this.renderDetail = this.renderDetail.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.cancelPopUp = this.cancelPopUp.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
  }

  componentDidMount() {
    gapi.client.load('calendar', 'v3', () => {
      // connected
      console.log('gapi calendar connected!!!');

      this.onViewChange();
    });
  }

  cancelPopUp() {
    this.setState({ ...this.state, showDetail: false });
  }

  addEvent(eventInfo){
    var startT = new Date(eventInfo.start);
    var endT = new Date(eventInfo.end);

    if (startT.toString() === endT.toString()) {
      endT = endT.setDate(endT.getDate() + 1);
    }
    const googleEvent = {
      start: {
        dateTime: moment(startT).utc().format()
      },
      end: { 
        dateTime: moment(endT).utc().format()
      }
    }

    const itemRequest = gapi.client.calendar.events.insert({
      calendarId: this.props.compUser.user_email
    }, googleEvent);

    itemRequest.execute(data => {
      console.log(data);
      var newEvent = {
        title: '',
        start: startT,
        end: endT,
        description: '',
        index: this.state.events.length,
        g_id: data.id
      };
      const newState = { ...this.state, currEvent: newEvent.index, showDetail: true };
      newState.events.push(newEvent);

      this.setState(newState);
    });
  }

  deleteEvent(){
    const newState = { ...this.state, currEvent: -1, showDetail: false };
    const deleted = newState.events.splice(this.state.currEvent, 1);
    console.log('deleted:', deleted);
    const itemRequest = gapi.client.calendar.events.delete({
      calendarId: this.props.compUser.user_email,
      eventId: deleted[0].g_id
    });

    itemRequest.execute(() => {
      this.setState(newState);
    });
  }

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
      description: data.description
    }

    const itemRequest = gapi.client.calendar.events.update({
      calendarId: this.props.compUser.user_email,
      eventId: data.g_id
    }, googleEvent);

    itemRequest.execute(data => {
      console.log('Updated event!');
      this.setState(newState);
    });
  }

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
            index: i,
            g_id: items[i].id
          });
        }
      }
      this.setState({ ...this.state, events: eventData });
    });
  }

  onEventClick(eventInfo) {
    console.log(eventInfo);
    this.setState({ ...this.state, currEvent: eventInfo.index, showDetail: true });
  }

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

  render() {
    console.log(this.state.events);
    this.renderDetail();
    return (
          // React Components in JSX look like HTML tags
          <BigCalendar
            selectable
            defaultView="week"
            events={this.state.events}
            step={30}
            style={{height: '75%',
                    width: '80%'}}
            onSelectSlot={this.addEvent}
            onSelectEvent={this.onEventClick}
            //onEventDrop={this.moveEvent}
            //resizable
            //onEventResize={this.resizeEvent}
          />
        )
  }
}

export default Calendar;
