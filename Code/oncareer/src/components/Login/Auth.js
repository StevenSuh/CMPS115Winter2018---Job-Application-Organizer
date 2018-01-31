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
    localStorage.removeItem('id');
  }
}

export default Auth;
