var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/users')

/* GET ALL USERS */
router.get('/', function(req, res, next){
  User.find(function(err, users){
    if (err) return next(err);
    res.json(users)
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next){
  User.findById(req.params.id, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

/* GET USER BY USER_ID */
router.get('/acc/:id', function(req, res, next){
  User.find({user_id: req.params.id}, function(err, post){
    if(err) return next(err)
    res.json(post);
  })
})


/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  })
})

/* UPDATE USER */
router.put('/:id', function(req, res, next){
  User.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  })
})

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if(err) return next(err);
    res.json(post);
  })
})

module.exports = router;
