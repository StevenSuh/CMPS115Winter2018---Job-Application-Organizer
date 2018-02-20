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

    this.state = { boards: [], options: [] };

    this.updateBoard = this.updateBoard.bind(this);
    this.addToBoard = this.addToBoard.bind(this);
  }

  componentDidMount() {
    // this is where axios call should occur to update
    // boards by pushing a JSX element of boards
    axios.get(url + 'boards/acc/' + Auth.getId())
      .then(res => {
        res.data.sort(function(a,b) { return a.index - b.index; });

        const options = [];
        res.data.forEach((element) => options.push({value: element.board_name, label: element.board_name}));
        this.setState({ boards: res.data, options: options });
      });
  }

  updateBoard(data_list, board_name) {
    const tempState = { ...this.state };
    const target = tempState.boards.find(el => {
      return el.board_name === board_name;
    });
    target.jobs = data_list;
    this.setState(tempState);
  }

  addToBoard(new_data, new_board_name, old_data_list, old_board_name) {
    const tempState = { ...this.state };
    const target = tempState.boards.find((el) => {
      return el.board_name === new_board_name;
    });
    target.jobs.push(new_data);

    console.log(target);

    const oldTarget = tempState.boards.find(el => {
      return el.board_name === old_board_name;
    });
    oldTarget.jobs = old_data_list;    

    axios.put(`http://localhost:3001/boards/${target._id}`, 
      { board_name: target.board_name, jobs: target.jobs }
    ).then(res => {
      this.setState(tempState);
    });
  }

  render() {
    const actual = [];
    for (let i = 0; i < this.state.boards.length; i++) {
      actual.push(
        <Board
          compData={this.state.boards[i]}
          key={i}
          options={this.state.options}
          addToBoard={this.addToBoard}
          updateBoard={this.updateBoard}
        />
      );
    }

    return (
      <div className={`${classes.dashboard}`}>
        <h2 className={`${classes.title}`}>
          {this.props.compUser.user_name ? 
            this.props.compUser.user_name + "'s Career Dashboard" : 
            ''}
        </h2>

        <div className={`${classes.boards}`}>
          {actual}
          <BoardAdd />
        </div>
      </div>
    );
  }
}

export default Dashboard;