/* global gapi */
import React, { Component } from 'react';
import classes from './GoogleSignIn.css';


class GoogleSignIn extends React.Component {

  constructor(props){
      super(props);
      this.onSignIn = this.onSignIn.bind(this)
  }



  componentDidMount() {
      console.log('this mounted')
      gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': '380',
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': this.onSignIn,
      });
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
      <div className={classes.root}>
        <div className={classes.container}>
          <h1>{this.props.title}</h1>
            <p className={classes.lead}>
              Log in with your google account.
            </p>
            {/* data-onsuccess={this.onSignIn} */}
            <div id='my-signin2' className={classes.formGroup}>
           </div>
         </div>
       </div>
     )
   }

 }


export default GoogleSignIn;
