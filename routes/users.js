var Users = require('../models/users-model');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/shyft');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Connection Error', err);
});

db.once('open', function(){
    console.log('Connected to the Database')
});

router.findAll = function(req, res) {
    Users.find(function(err, job) {
        if(err)
            res.send(err);
        else
            res.json(job);
    });
};

router.findOne = function(req,res) {
    Users.find({"_id" : req.params.id}, function(err, user) {
        if(err)
            res.json({message: 'User Not Found!', errmsg : err});
        else
            res.json(user);
    });
};

module.exports = router;
