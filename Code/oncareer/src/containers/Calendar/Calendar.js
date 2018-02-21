/* eslint import/no-webpack-loader-syntax: off */
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//import './Calendar.css';
//import 'react-big-calendar/lib/css/react-big-calendar.css';

import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

require('./Calendar.css');
BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {

  state = {
      events: []
      }

  constructor () {
    super();
  }

  addEvent(eventInfo){
    var startT = new Date(eventInfo.start.toLocaleString());
    var endT = new Date(eventInfo.end.toLocaleString());
    var eName = prompt("Enter a title for the event");
    //var eDesc = prompt("Enter a description for the event.");
    var newEvent = {
      title: eName,
      start: startT,
      end: endT,
      //desc: eDesc,
    };
    if(eName != ""){
      this.state.events.push(newEvent);
      this.setState(this.state.events);
    }
  }

  deleteEvent(eventInfo){

  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
      })

    this.setState({
      events: nextEvents,
    })
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;
    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)
    this.setState({
      events: nextEvents,
    })
    alert(`${event.title} was dropped onto ${event.start}`)
  }


  render () {
    return (
          // React Components in JSX look like HTML tags
          <BigCalendar
            selectable
            defaultView="week"
            events={this.state.events}
            step={30}
            style={{height: '75%',
                    width: '80%'}}
            onSelectSlot={slotInfo =>
              //handle event adding. add to state.
              this.addEvent(slotInfo)
              //add to backend

            }
            onSelectEvent={eventInfo =>
              console.log("This is an event. Add a popup for editing and deleting pleases")
            }
            //onEventDrop={this.moveEvent}
            //resizable
            //onEventResize={this.resizeEvent}
          />
        )
  }
}

export default Calendar;
