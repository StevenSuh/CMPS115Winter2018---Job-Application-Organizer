import React, { Component } from 'react';

import JobApp from './jobapp';
import JobAdd from './jobadd';

import classes from './styles.css';

class Board extends Component {
  render() {
    let icon = '';

    switch (this.props.compData.board_name) {
      case 'Applied':
        icon = <span className={`${classes.board_icon} ${classes.applied}`}>
                 <svg width="16" height="13" viewBox="0 0 16 13">
                   <path fill="#000000" d="M 16 1.28914L 5.02857 12.2606L 0 7.232L 1.28914 5.94286L 5.02857 9.67314L 14.7109 1.39509e-07L 16 1.28914Z"/>
                 </svg>
               </span>
        break;
      case 'Interview':
        icon = <span className={`${classes.board_icon} ${classes.interview}`}>
                 <svg width="16" height="16" viewBox="0 0 16 16">
                   <path fill="#000000" d="M 8 0C 9.06087 8.88178e-16 10.0783 0.421427 10.8284 1.17157C 11.5786 1.92172 12 2.93913 12 4C 12 5.06087 11.5786 6.07828 10.8284 6.82843C 10.0783 7.57857 9.06087 8 8 8C 6.93913 8 5.92172 7.57857 5.17157 6.82843C 4.42143 6.07828 4 5.06087 4 4C 4 2.93913 4.42143 1.92172 5.17157 1.17157C 5.92172 0.421427 6.93913 8.88178e-16 8 0ZM 8 10C 12.42 10 16 11.79 16 14L 16 16L 0 16L 0 14C 0 11.79 3.58 10 8 10Z"/>
                 </svg>
               </span>
        break;
      case 'Offer':
        icon = <span className={`${classes.board_icon} ${classes.offer}`}>
                 <svg width="14" height="13" viewBox="0 0 14 13">
                   <path fill="#000000" d="M 5 0L 3 4L 6 4L 6 10L 0 10L 0 4L 2 0L 5 0ZM 13 0L 11 4L 14 4L 14 10L 8 10L 8 4L 10 0L 13 0Z"/>
                 </svg>
               </span>
        break;
      case 'Interested':
        icon = <span className={`${classes.board_icon} ${classes.interested}`}>
                 <svg width="9" height="16" viewBox="0 0 9 16">
                   <path fill="#000000" d="M 3.01431 12.8108L 5.27503 12.8108L 5.27503 15.0715L 3.01431 15.0715L 3.01431 12.8108ZM 4.52146 0C 8.55309 0.165787 10.3089 4.2351 7.91255 7.28708C 7.28708 8.04066 6.27729 8.53802 5.77993 9.17103C 5.27504 9.79649 5.27503 10.5501 5.27503 11.3036L 3.01431 11.3036C 3.01431 10.0452 3.01431 8.98263 3.5192 8.22906C 4.01656 7.47548 5.02635 7.03087 5.65182 6.53351C 7.47548 4.8455 7.02333 2.45666 4.52146 2.26073C 3.92188 2.26073 3.34685 2.49891 2.92288 2.92288C 2.49891 3.34685 2.26073 3.92188 2.26073 4.52146L 0 4.52146C 6.6931e-16 3.32229 0.476367 2.17224 1.3243 1.3243C 2.17224 0.476367 3.32229 1.00397e-15 4.52146 0Z"/>
                 </svg>
               </span>
        break;
    }

    const list = [];

    for (let i = 0; i < this.props.compData.jobs.length; i++) {
      list.push(
        <JobApp 
          compItem={this.props.compData.jobs[i]}
          key={i}
        />
      );
    }

    list.push(
      <JobAdd 
        compItem={this.props.compData.board_name}
        key={list.length}
      />
    );

    return (
      <div id={this.props.compData.board_name}>
        <h4 className={`${classes.board_title}`}>
          {icon}
          {this.props.compData.board_name}
        </h4>

        <div className={`${classes.jobs}`}>
          {list}
        </div>
      </div>
    );
  }
}

export default Board;