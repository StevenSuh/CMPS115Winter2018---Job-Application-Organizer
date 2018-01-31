import React, { Component } from 'react';
import classes from './LandingPage.css';

import screenshot from './screenshot.png';
import SignIn from '../Login/Login';
import Auth from '../Login/Auth'
import axios from 'axios'

class LandingPage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        url: "http://localhost:3001/users/"
      }
    }

    componentDidMount(){
      console.log("Landing Page mounted")
    }

    render(){
        return (
        <div className={classes.landingPage}>
          <header className={classes.header}>
            <h2 className={classes.title}>
              onCareer
            </h2>

            <nav className={classes.navigation}>
              <button className={classes.nav_button}>
                About
              </button>

              <button className={classes.nav_button}>
                Sign In
              </button>
            </nav>
          </header>

          <p className={classes.description}>
            Organize and keep track of your job applications in an efficient manner
          </p>

          <SignIn />

          <img className={classes.heroimage} src={screenshot} alt="screenshot" />
          
          <div className={classes.about}>
            <h3 className={classes.about_title}>
              About
            </h3>
            <p className={classes.about_description}>
              This is a project done by a group of students from University of California, Santa Cruz.
              <br/>
              <br/>
              The web application is built on MERN stack (MongoDB + Express + React + Node.js).
              <br/>
              And it consists of three core features: Dashboard, Calendar, and Analytics.
              <br/>
              <br/>
              If you have any questions or comments, feel free to reach out to us at <a href="mailto:oncareer115@gmail.com" target="_top">onCareer115@gmail.com</a>.
            </p>
            <p className={classes.copyright}>
              Copyright 2018
            </p>
          </div>
        </div>
        )
    }
}

export default LandingPage;
