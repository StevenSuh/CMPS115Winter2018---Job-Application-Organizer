import React, { Component } from 'react';
import axios from 'axios';

import Board from './board';
import BoardAdd from './boardadd';

import classes from './styles.css';
import Auth from '../../../Login/Auth';

import url from '../../../../url';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { boards: [], options: [] };

    this.updateBoard = this.updateBoard.bind(this);
    this.addToBoard = this.addToBoard.bind(this);
    this.addNewBoard = this.addNewBoard.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
  }

  componentDidMount() {
    // this is where axios call should occur to update
    // boards by pushing a JSX element of boards
    axios.get(`${url}boards/acc/${Auth.getId()}`)
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

  //when the user clicks the X by a new board, it will de-render it and remove
  //all the information from the database.
  removeBoard(index){
    console.log(this.state.boards);
    console.log(this.state.options);
    console.log(index);

    const id = this.state.boards[index]._id;
    console.log(`${url}boards/${id}`);
    axios.delete(`${url}boards/${id}`);
    this.state.boards[index] = null;
    this.state.options[index] = null;
    this.setState({ ...this.state, board: this.state.boards });
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

    axios.put(`${url}boards/${target._id}`,
      { board_name: target.board_name, jobs: target.jobs }
    ).then(res => {
      this.setState(tempState);
    });
  }

  //When the add new board button is clicked, the user is prompted for a board Name
  //from there this information is used to create a new board and update the database
  addNewBoard(){
    var name = prompt("Enter a name for the board.");
    var newBoard = {
      board_name: name,
      jobs: [],
      user_id: this.props.compUser.user_id,
      index: this.state.boards.length
    }
    if(newBoard.board_name != '' && newBoard.board_name != null) {
      axios.post(`${url}boards/`, newBoard)
        .then(res => {
          console.log(res.data);

          this.state.boards.push(res.data);
          this.state.options.push({ value: name, label: name });

          this.setState({
            ...this.state,
            board: this.state.boards,
            options: this.state.options
          });
        });
      }
  }

  render() {
    const actual = [];
    for (let i = 0; i < this.state.boards.length; i++) {
      if (this.state.boards[i]) {
        actual.push(
          <Board
            compData={this.state.boards[i]}
            key={actual.length}
            compIndex={actual.length}
            options={this.state.options}
            addToBoard={this.addToBoard}
            updateBoard={this.updateBoard}
            onClick={this.removeBoard}
          />
        );
      } else {
        actual.push('');
      }
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
          <BoardAdd onClick={this.addNewBoard}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
