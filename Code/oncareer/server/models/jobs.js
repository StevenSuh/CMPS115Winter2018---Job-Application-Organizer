var mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
  title: String,
  company: String,
  date: String,
  logo: String,
  description: String
})

module.exports = JobsSchema;
