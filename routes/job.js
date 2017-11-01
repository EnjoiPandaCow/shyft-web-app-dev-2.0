var Job = require('../models/jobs-model');
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
    Job.find(function(err, job) {
       if(err)
           res.send(err);
       res.json(job);
    });
};

router.findOne = function(req,res) {
  Job.find({"_id" : req.params.id}, function(err, job) {
     if(err)
         res.json({message: 'Job Not Found!', errmsg : err});
     else
         res.json(job);
  });
};

router.addJob = function (req,res) {
    var job = new Job();

    job.title = req.body.title;
    job.desc = req.body.desc;
    job.size = req.body.size;
    job.cLoc = req.body.cLoc;
    job.cCoordinates = req.body.cCoordinates;
    job.dLoc = req.body.dLoc;
    job.dCoordinates = req.body.dCoordinates;
    job.dTime = req.body.dTime;
    job.price = req.body.price;
    job.photos = req.body.photos;

    console.log('Adding job: ' + JSON.stringify(job));

    job.save(function(err) {
       if (err)
           res.send(err);
       else
           res.json({message: 'Job Added!', data: job});
    });
};

router.updateJob = function (req,res) {
  Job.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, doc) {
     if(err)
         return res.json(err);
     else
         return res.json(doc);
  });
};

router.deleteJob = function(req, res) {

    Job.findByIdAndRemove(req.params.id, function(err) {
        if(err)
            res.send(err);
        else
            res.json({message: 'Donation Deleted!'});
    });
};

module.exports = router;