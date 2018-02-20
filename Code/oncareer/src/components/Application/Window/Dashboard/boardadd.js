import React, { Component } from 'react';

import classes from './styles.css';

class BoardAdd extends Component {
  render() {
    return (
      <div className={`${classes.board_add}`}>
        <h4 className={`${classes.board_title}`}>
          Add New Board
        </h4>

        <div className={`${classes.board_add_button}`}>
          +
        </div>
      </div>
    );
  }
}

export default BoardAdd;