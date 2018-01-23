import React, { Component } from 'react';
import GoogleSignIn from './GoogleSignIn/GoogleSignIn';

class Login extends React.Component {

  render() {

    return (
            <div>
                <GoogleSignIn />
            </div>
    );
  }

}

export default Login;
