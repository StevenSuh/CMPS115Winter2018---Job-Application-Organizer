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
  constructor () {
    super();
  }
  render () {
    return (
          // React Components in JSX look like HTML tags
          <BigCalendar
            style={{height: '420px',
                    width: '80%'}}
            events={[]}
          />
        )
  }
}

export default Calendar;
