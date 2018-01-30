var mongoose = require('mongoose');

var BoardsSchema = new mongoose.Schema({
  board_name: String,
  jobs: Array
})

module.exports = mongoose.model('Board', BoardsSchema)
