import React, { Component } from 'react';
import axios from 'axios'
import GoogleSignIn from './GoogleSignIn/GoogleSignIn';

class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id: "",
      name: "",
      email: "",
      newUser: true,
      url: "http://localhost:3001/users/",
      data: [],
      mounted: false
    }

    this.getUser = this.getUser.bind(this)
    this.loadUserData = this.loadUserData.bind(this)
    this.loadData = this.loadData.bind(this)
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
    var url = this.state.url + "acc/41"
    var user = []
    axios.get(url)
      .then(res => {
        this.setState({...this.state, data: res.data});
    })
    console.log(this.state.data)
  }

  getUser(id, name, email){
    var obj = {id, name, email}
    var url = this.state.url + "acc/41"
    var arr = null
    this.loadUserData()
    arr = this.state.data
    console.log(arr)
    if(arr.length == 0){
      var user = {user_id: id, user_name: name, user_email: email}
      axios.post(this.state.url, user)
        .catch(err => {
          console.log(err)
        })
      console.log("New user")
    }
    else{
      console.log("Old user")
    }
    console.log(arr)

  }

  render() {
    this.loadData()
    return (
            <div>
                <GoogleSignIn getUser = {this.getUser}/>
            </div>
    );
  }

}

export default Login;
