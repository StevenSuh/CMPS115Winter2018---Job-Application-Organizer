import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import obj from './GoogleSignIn/GoogleSignIn';
import Auth from './Auth'
var GoogleSignIn = obj.GoogleSignIn

class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id: "",
      name: "",
      email: "",
      newUser: true,
      url: "http://localhost:3001/",
      data: [],
      mounted: false
    }

    this.getUser = this.getUser.bind(this)
    this.loadUserData = this.loadUserData.bind(this)
    this.loadData = this.loadData.bind(this)
    this.configureUser = this.configureUser.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  loadData(){
    if(!this.state.mounted){
      this.setState({
        mounted: true
      })
      this.loadUserData()
      setInterval(this.loadUserData, 800)
    }
  }

  loadUserData(){
    var url = this.state.url + "users/acc/41"
    axios.get(url)
      .then(res => {
        this.setState({...this.state, data: res.data});
    })
    console.log(this.state.data)
  }

  configureUser(data, user){
    if(Auth.isUserAuthenticated()) {
      // already logged in
      console.log("User is logged in");
    }else{
      if(data.length == 0){
        axios.post(this.state.url + 'users/', user)
          .then(() => {
            console.log("Added new user")
          })
          .catch(err => {
            console.log(err)
          })
        
        const initBoard = [
          { board_name: 'Applied', jobs: [], user_id: user.user_id, index: 0 }, 
          { board_name: 'Interview', jobs: [], user_id: user.user_id, index: 1 }, 
          { board_name: 'Offer', jobs: [], user_id: user.user_id, index: 2 }, 
          { board_name: 'Interested', jobs: [], user_id: user.user_id, index: 3 }
        ];
        for (let i = 0; i < initBoard.length; i++) {
          axios.post(this.state.url + 'boards/', initBoard[i]);
        }
      }
      else{
        console.log("Old user")
        console.log(data, user);
        axios.get(this.state.url + 'boards/acc/' + user.user_id)
          .then(res => {
            if (!res.data[0]) {
              const initBoard = [
                { board_name: 'Applied', jobs: [], user_id: user.user_id }, 
                { board_name: 'Interview', jobs: [], user_id: user.user_id }, 
                { board_name: 'Offer', jobs: [], user_id: user.user_id }, 
                { board_name: 'Interested', jobs: [], user_id: user.user_id }
              ];
              for (let i = 0; i < initBoard.length; i++) {
                axios.post(this.state.url + 'boards/', initBoard[i]);
              }
            }
          });
      }
      Auth.authenticateUser(user.user_id);

      // Login successful!
      // loading? confirmation message?

      // redirect to app
      // this.props.history.push('/app');
    }
  }

  getUser(id, name, email){
    var obj = {id, name, email}
    var url = this.state.url + "users/acc/" + id
    var arr = null
    var user = {user_id: id, user_name: name, user_email: email}
    axios.get(url)
      .then(res => {
        this.setState({...this.state, data: res.data})
        this.configureUser(this.state.data, user)
      })
  }

  logOut(){
      Auth.deauthenticateUser()
  }

  render() {
    var Authenticated = Auth.isUserAuthenticated()
    console.log(Authenticated)
    return (
      <div>
        <GoogleSignIn 
          getUser={this.getUser} 
          logOut={this.logOut}
        />
      </div>
    );
  }

}

export default withRouter(Login);
