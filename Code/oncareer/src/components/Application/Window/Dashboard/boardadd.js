import React, { Component } from 'react';

import classes from './styles.css';

class BoardAdd extends Component {
  render() {
    return (
      <div className={`${classes.board_add}`}>
        <div className={`${classes.board_add_button}`}>
          <span>+</span>
        </div>
      </div>
    );
  }
}

export default BoardAdd;