import React, { Component } from 'react';
import axios from 'axios';

import Board from './board';
import BoardAdd from './boardadd';

import classes from './styles.css';
import Auth from '../../../Login/Auth';

const url = 'http://localhost:3001/';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { boards: [], db_boards: {} };
  }

  componentDidMount() {
    // this is where axios call should occur to update
    // boards by pushing a JSX element of boards
    axios.get(url + 'boards/acc/' + Auth.getId())
      .then(res => {
        res.data.sort(function(a,b) { return a.index - b.index; });
        const actual = [];

        for (let i = 0; i < res.data.length; i++) {
          actual.push(
            <Board 
              compData={res.data[i]}
              key={i}
            />
          );
        }
        this.setState({ db_boards: res.data, boards: this.state.boards.concat(actual) });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className={`${classes.dashboard}`}>
        <h2 className={`${classes.title}`}>
          {this.props.compUser.user_name ? 
            this.props.compUser.user_name + "'s Career Dashboard" : 
            ''}
        </h2>

        <div className={`${classes.boards}`}>
          {this.state.boards}
          <BoardAdd />
        </div>
      </div>
    );
  }
}

export default Dashboard;