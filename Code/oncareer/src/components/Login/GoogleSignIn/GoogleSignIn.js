/* global gapi */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './GoogleSignIn.css';
import Auth from '../Auth'

function getGapi(callback){
  var auth2 = gapi.auth2.getAuthInstance();

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

  renderContent() {
    let isSignedIn = false;

    if (gapi && gapi.auth2) {
      const auth2 = gapi.auth2.getAuthInstance();

      if (auth2) {
        isSignedIn = auth2.isSignedIn.get();
      }
    }

    const toRender = [
      <div key="0" id='my-signin2' className={`${classes.formGroup} ${isSignedIn ? classes.hide : ''}`} />
    ];

    if (isSignedIn) {
      toRender.push(
        <Link key="1" className={classes.redirect} to="/app">
          <div className="abcRioButton abcRioButtonLightBlue">
            <div className="abcRioButtonContentWrapper">
              <div className="abcRioButtonIcon" style={{ padding: '15px' }}>
                <div className="abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18" style={{ width: '18px', height: '18px' }}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                </div>
              </div>

              <span className="abcRioButtonContents" style={{ fontSize: '16px', lineHeight: "48px", marginLeft: '-12px' }}>
                Redirect to App
              </span>
            </div>
          </div>
        </Link>
      );
    }
    return toRender;
  }

  render() {
    return (
      <div className={classes.container}>
        {this.renderContent()}
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
