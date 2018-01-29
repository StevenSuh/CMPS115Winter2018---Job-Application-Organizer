import React, { Component } from 'react';
import classes from './LandingPage.css';
import Screenshot from './Screenshot/Screenshot.js';
import SignIn from '../Login/Login';
import Auth from '../Login/Auth'
import axios from 'axios'

class LandingPage extends React.Component {
    constructor(props){
      super(props)
      this.state ={
        url: "http://localhost:3001/users/"
      }
    }

    componentDidMount(){
      console.log("Landing Page mounted")

    }

    render(){
        return (
          <div className={classes.heroimage}>
            <Screenshot />
          <div className={classes.about}>
            About.
          </div>
        </div>
        )
    }
}

export default LandingPage;
