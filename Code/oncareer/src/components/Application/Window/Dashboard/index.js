import React, { Component } from 'react';

import Board from './board';

import classes from './styles.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { boards: [] };
  }

  componentDidMount() {
    // this is where axios call should occur to update
    // boards by pushing a JSX element of boards

    // for now ill just push temp objects
    const temp = [
      {
        board_name: 'Applied',
        jobs: [
          {
            title: 'Software Engineering Intern',
            company: 'Google',
            date: '1/5/2018',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAALTAAAAJGY1NGY1N2ZhLTNmZmUtNGRmZi1iMDgxLTJjZjdkNjNkYmZlOQ.png'
            // description: ''
          },
          {
            title: 'Software Engineer Intern/Co-op',
            company: 'Facebook',
            date: '1/3/2018',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAYRAAAAJDVlMzBlYjNiLTAxN2QtNGQxZC1iZTAzLTlmNWQ1OTE4OGY4ZA.png'
          },
          {
            title: '2018 Summer Internship - Software Development Engineer',
            company: 'Amazon',
            date: '1/2/2018',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA0ZAAAAJDk1ZjA0ZTJmLWQwYWQtNDEwNS04M2QxLTIwM2UxMTE0NTBkMw.png'
          },
          {
            title: 'Software Engineer Internship',
            company: 'Microsoft',
            date: '12/27/2017',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAjfAAAAJGMyYmExNThhLTNlYmMtNDAzYi05MmNmLWFmOTY1NDcyMTFjMA.png'
          },
          {
            title: '2018 University Application | Full-Time & Internship',
            company: 'Twitter',
            date: '12/27/2017',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAATdAAAAJGVhNWFjN2Q5LTYzNjYtNDU4YS04ZjcwLWEyMTNhZDA5NTgxNQ.png'
          }
        ]
      },
      {
        board_name: 'Interview',
        jobs: [
          {
            title: '2018 University Application | Full-Time & Internship',
            company: 'Twitter',
            date: '12/27/2017',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAATdAAAAJGVhNWFjN2Q5LTYzNjYtNDU4YS04ZjcwLWEyMTNhZDA5NTgxNQ.png'
          }
        ]
      },
      {
        board_name: 'Offer',
        jobs: [
          {
            title: '2018 University Application | Full-Time & Internship',
            company: 'Twitter',
            date: '12/27/2017',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAATdAAAAJGVhNWFjN2Q5LTYzNjYtNDU4YS04ZjcwLWEyMTNhZDA5NTgxNQ.png'
          }
        ]
      },
      {
        board_name: 'Interested',
        jobs: [
          {
            title: '2018 University Application | Full-Time & Internship',
            company: 'Twitter',
            date: '12/27/2017',
            logo: 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAATdAAAAJGVhNWFjN2Q5LTYzNjYtNDU4YS04ZjcwLWEyMTNhZDA5NTgxNQ.png'
          }
        ]
      },
      {
        board_name: 'New List',
        jobs: [
        ]
      }
    ];
    const actual = [];

    for (let i = 0; i < temp.length; i++) {
      actual.push(
        <Board 
          compData={temp[i]}
          key={i}
        />
      );
    }
    this.setState({ boards: this.state.boards.concat(actual) });
  }

  render() {
    console.log('compUser:', this.props.compUser);
    return (
      <div className={`${classes.dashboard}`}>
        <h2 className={`${classes.title}`}>
          {this.props.compUser.user_name ? 
            this.props.compUser.user_name + "'s Career Dashboard" : 
            ''}
        </h2>

        <div className={`${classes.boards}`}>
          {this.state.boards}
        </div>
      </div>
    );
  }
}

export default Dashboard;