export default (process.env.NODE_ENV === 'production') ? 
  'https://oncareer.herokuapp.com/' : 
  'http://localhost:3001/';