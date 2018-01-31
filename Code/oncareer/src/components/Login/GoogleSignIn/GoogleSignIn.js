/* global gapi */
import React, { Component } from 'react';
import classes from './GoogleSignIn.css';
import Auth from '../Auth'

function getGapi(callback){
  var auth2 = gapi.auth2.getAuthInstance();
  if (!auth2) {
    gapi.auth2.init();
    auth2 = gapi.auth2.getAuthInstance();
  }

  auth2.signOut().then(function () {
    console.log('User signed out.');
    callback();
  })
}

class GoogleSignIn extends React.Component {

  constructor(props){
      super(props);
      this.onSignIn = this.onSignIn.bind(this)
      this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
      console.log('GoogleSignIn mounted')
      Auth.storeGapi(gapi);
      gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 230,
          'height': 50,
          'longtitle': true,
          'theme': 'light',
          'onsuccess': this.onSignIn,
      });
  }

  signOut() {
    Auth.logOut()
    this.props.logOut()
  }

  onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.props.getUser(profile.getId(), profile.getName(), profile.getEmail())
  }

  render() {
    return (
      <div className={classes.container}>
        <div id='my-signin2' className={classes.formGroup} />
      </div>
    )
   }
 }

//Need to be able to access both GoogleSignIn and getGapi so finalObj wraps
//both of these into one object and then we can access them individually as
//on module. If you have a better solution please let me know!
var finalObj = {
  GoogleSignIn: GoogleSignIn,
  getGapi: getGapi
}

export default finalObj;
