var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  user_name: String,
  user_email: String,
  user_id: String
})

module.exports = mongoose.model('User', UsersSchema)
