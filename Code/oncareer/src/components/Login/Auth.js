import obj from './GoogleSignIn/GoogleSignIn'

class Auth{
  static authenticateUser(id){
    localStorage.setItem('id', id);
  }

  static isUserAuthenticated(){
    console.log(localStorage.getItem('id'));
    return localStorage.getItem('id') != null;
  }

  static getId() {
    return localStorage.getItem('id');
  }

  static deauthenticateUser() {
    localStorage.clear();
  }

  static storeGapi(obj){
    localStorage.setItem('gapi', obj)
    console.log(obj)
  }

  static logOut(callback) {
    var gapi = localStorage.getItem('gapi')
    Auth.deauthenticateUser();
    obj.getGapi(callback);
  }
}

export default Auth;
