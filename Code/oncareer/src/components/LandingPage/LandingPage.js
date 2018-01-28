import React, { Component } from 'react';
import classes from './LandingPage.css';
import Screenshot from './Screenshot/Screenshot.js';
import SignIn from '../Login/Login';

const LandingPage = () => {
  return(
    <div className={classes.heroimage}>
      <Screenshot />
      <div className={classes.herotext}>
        <SignIn/>
      </div>
    <div className={classes.about}>
      About.
    </div>
  </div>
  )


}

export default LandingPage;
