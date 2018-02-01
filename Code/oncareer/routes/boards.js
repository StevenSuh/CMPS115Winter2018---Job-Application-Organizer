var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/boards')

/* GET ALL BOARDS */
router.get('/', function(req, res, next){
  Boards.find(function(err, users){
    if (err) return next(err);
    res.json(users)
  });
});

/* GET SINGLE BOARD BY ID (not USER_ID) */
router.get('/:id', function(req, res, next){
  Boards.findById(req.params.id, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

/* GET BOARD BY USER_ID */
router.get('/acc/:id', function(req, res, next){
  Boards.find({user_id: req.params.id}, function(err, post){
    if(err) return next(err)
    res.json(post);
  })
})


/* SAVE BOARD */
router.post('/', function(req, res, next) {
  Boards.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  })
})

/* UPDATE BOARD */
router.put('/:id', function(req, res, next){
  Boards.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  })
})

/* DELETE BOARD */
router.delete('/:id', function(req, res, next) {
  Boards.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if(err) return next(err);
    res.json(post);
  })
})

module.exports = router;
