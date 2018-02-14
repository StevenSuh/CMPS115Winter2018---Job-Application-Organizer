var mongoose = require('mongoose');
const JobsSchema = require('./jobs');

var BoardsSchema = new mongoose.Schema({
  board_name: String,
  jobs: [JobsSchema],
  user_id: String
})

module.exports = mongoose.model('Board', BoardsSchema)
