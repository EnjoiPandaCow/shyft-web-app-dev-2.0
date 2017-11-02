var User = require('../models/users-model');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/shyft');

var db = mongoose.connection;

db.on('error', function(err){

});

db.once('open', function(){

});

router.findAll = function(req, res) {
    User.find(function(err, user) {
        if(err)
            res.status(404).send(err);
        else
            res.status(200).json(user);
    });
};

router.findOne = function(req,res) {
    User.find({"_id" : req.params.id}, function(err, user) {
        if(err)
            res.status(404).json({message: 'User Not Found! Please Try Another Job ID.'});
        else
            res.status(200).json(user);
    });
};

router.addUser = function (req,res) {
    var user = new User();

    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.contactNo = req.body.contactNo;
    user.password = req.body.password;
    user.street = req.body.street;
    user.town = req.body.town;
    user.county = req.body.county;

    user.save(function(err) {
        if (err)
            res.status(400).json({message: 'User Not Added! Please Check That You Are Filling All Fields'});
        else
            res.status(200).json({message: 'User Added!'});
    });
};

router.updateUser = function (req,res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, doc) {
        if(err)
            res.status(400).json({message: 'Failed To Update User Profile. Please Try Again'});
        else
            res.status(200).json({message: 'User Updated'});
    });
};

router.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.status(400).json({message: 'Failed To Delete User. Please Try Again'});
        else
            res.status(200).json({message: 'User Sucessfully Deleted!'});
    });
};


module.exports = router;
