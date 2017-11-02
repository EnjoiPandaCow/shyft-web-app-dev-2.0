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

router.addUser = function (req,res) {
    var user = new Users();

    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.contactNo = req.body.contactNo;
    user.password = req.body.password;
    user.street = req.body.street;
    user.town = req.body.town;
    user.county = req.body.county;

    console.log('Adding job: ' + JSON.stringify(user));

    user.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'User Added!', data: user});
    });
};

router.updateUser = function (req,res) {
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, doc) {
        if(err)
            res.json(err);
        else
            res.json(doc);
    });
};


module.exports = router;
