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


module.exports = router;
