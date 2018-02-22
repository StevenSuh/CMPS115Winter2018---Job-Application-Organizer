'use strict'

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var boards = require('./routes/boards');
var utils = require('./routes/utils');

var app = express();

var port = process.env.PORT || 3001;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://godmod:MongoDBRoks321!@ds257077.mlab.com:57077/oncareerdb')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/users', users);
app.use('/boards', boards);
app.use('/api', utils);

app.listen(port, function(){
  console.log(`api running on port ${port}`);
})

module.exports = app;
