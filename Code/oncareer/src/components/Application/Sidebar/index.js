import React, { Component } from 'react';
import Auth from '../../Login/Auth'
import classes from './styles.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.logOut = this.logOut.bind(this)
  }

  onButtonClick(event) {
    document.getElementsByClassName(classes.active)[0].classList.remove(classes.active);
    event.currentTarget.classList.add(classes.active);
    this.props.compUpdate(event.currentTarget.getAttribute('data-class'));
  }

  //Logs out, will not get props automatically that is why it's passed in from
  //the parent React component
  logOut(){
    const callback = () => {
      this.props.history.push('/');
    }
    Auth.logOut(callback); // pass a callback
  }

  render() {
    return (
      <div className={`${classes.sidebar}`}>
        <div className={`${classes.top}`}>
          <button
            className={`${classes.button}`}
            data-class="profile"
            style={{ cursor: "default" }}
          >
            <div className={`${classes.profile}`}>
              {this.props.compUser.user_name ? this.props.compUser.user_name.slice(0,1) : ''}
            </div>
          </button>

          <button
            className={`${classes.button} ${classes.active}`}
            data-class="dashboard"
            onClick={this.onButtonClick}
          >
            <svg width="30" height="33" viewBox="0 0 40 44">
              <path fill="#FAFAFA" d="M 31.1111 17.6L 8.88889 17.6L 8.88889 13.2L 31.1111 13.2L 31.1111 17.6ZM 31.1111 26.4L 8.88889 26.4L 8.88889 22L 31.1111 22L 31.1111 26.4ZM 24.4444 35.2L 8.88889 35.2L 8.88889 30.8L 24.4444 30.8L 24.4444 35.2ZM 20 4.4C 20.5894 4.4 21.1546 4.63178 21.5713 5.04436C 21.9881 5.45694 22.2222 6.01652 22.2222 6.6C 22.2222 7.18348 21.9881 7.74305 21.5713 8.15563C 21.1546 8.56821 20.5894 8.8 20 8.8C 19.4106 8.8 18.8454 8.56821 18.4287 8.15563C 18.0119 7.74305 17.7778 7.18348 17.7778 6.6C 17.7778 6.01652 18.0119 5.45694 18.4287 5.04436C 18.8454 4.63178 19.4106 4.4 20 4.4ZM 35.5556 4.4L 26.2667 4.4C 25.3333 1.848 22.8889 0 20 0C 17.1111 0 14.6667 1.848 13.7333 4.4L 4.44444 4.4C 3.2657 4.4 2.13524 4.86357 1.30175 5.68873C 0.468252 6.51389 1.97373e-15 7.63305 9.86865e-16 8.8L 9.86865e-16 39.6C 1.97373e-15 40.767 0.468252 41.8861 1.30175 42.7113C 2.13524 43.5364 3.2657 44 4.44444 44L 35.5556 44C 36.7343 44 37.8648 43.5364 38.6982 42.7113C 39.5317 41.8861 40 40.767 40 39.6L 40 8.8C 40 7.63305 39.5317 6.51389 38.6982 5.68873C 37.8648 4.86357 36.7343 4.4 35.5556 4.4Z"/>
            </svg>
          </button>

          <button
            className={`${classes.button}`}
            data-class="calendar"
            onClick={this.onButtonClick}
          >
            <svg width="30" height="33" viewBox="0 0 40 44">
              <path fill="#FAFAFA" d="M 35.5556 39.6L 4.44444 39.6L 4.44444 15.4L 35.5556 15.4L 35.5556 39.6ZM 28.8889 0L 28.8889 4.4L 11.1111 4.4L 11.1111 0L 6.66667 0L 6.66667 4.4L 4.44444 4.4C 1.97778 4.4 0 6.358 0 8.8L 0 39.6C 9.86865e-16 40.767 0.468252 41.8861 1.30175 42.7113C 2.13524 43.5364 3.2657 44 4.44444 44L 35.5556 44C 36.7343 44 37.8648 43.5364 38.6982 42.7113C 39.5317 41.8861 40 40.767 40 39.6L 40 8.8C 40 6.358 38 4.4 35.5556 4.4L 33.3333 4.4L 33.3333 0L 28.8889 0ZM 31.1111 24.2L 20 24.2L 20 35.2L 31.1111 35.2L 31.1111 24.2Z"/>
            </svg>
          </button>

          <button
            className={`${classes.button}`}
            data-class="analytics"
            onClick={this.onButtonClick}
          >
            <svg width="30" height="27" viewBox="0 0 40 36">
              <path fill="#FAFAFA" d="M 40 36L 0 36L 0 0L 4 0L 4 32L 8 32L 8 14L 16 14L 16 32L 20 32L 20 6L 28 6L 28 32L 32 32L 32 22L 40 22L 40 36Z"/>
            </svg>
          </button>
        </div>

        <div className={`${classes.bottom}`}>
          <button className={`${classes.button}`} onClick={this.logOut}>
            <svg width="24" height="24" viewBox="0 0 32 32">
              <path fill="#FAFAFA" d="M 19.6978 22.3822L 24.3022 17.7778L 7.11111 17.7778L 7.11111 14.2222L 24.3022 14.2222L 19.6978 9.61778L 22.2222 7.11111L 31.1111 16L 22.2222 24.8889L 19.6978 22.3822ZM 28.4444 0C 29.3874 7.89492e-16 30.2918 0.374602 30.9586 1.0414C 31.6254 1.70819 32 2.61256 32 3.55556L 32 11.8578L 28.4444 8.30222L 28.4444 3.55556L 3.55556 3.55556L 3.55556 28.4444L 28.4444 28.4444L 28.4444 23.6978L 32 20.1422L 32 28.4444C 32 29.3874 31.6254 30.2918 30.9586 30.9586C 30.2918 31.6254 29.3874 32 28.4444 32L 3.55556 32C 1.58222 32 0 30.4 0 28.4444L 0 3.55556C 0 1.58222 1.58222 0 3.55556 0L 28.4444 0Z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
