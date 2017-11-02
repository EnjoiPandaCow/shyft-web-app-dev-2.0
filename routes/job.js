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
       else
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
    job.cStreet = req.body.cStreet;
    job.cTown = req.body.cTown;
    job.cCounty = req.body.cCounty;
    job.cCoordinates = req.body.cCoordinates;
    job.dStreet = req.body.dStreet;
    job.dTown = req.body.dTown;
    job.dCounty = req.body.dCounty;
    job.dCoordinates = req.body.dCoordinates;
    job.dTime = req.body.dTime;
    job.price = req.body.price;
    job.photos = req.body.photos;
    job.userId = req.body.userId;

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
            res.json({message: 'Job Deleted!'});
    });
};

/*
router.search = function(req, res) {

    Job.find().lean.exec(function(err, jobs) {
      if (err)
          res.status(400).send(err);

      var joobs = jobs;
      var key = [];

      if(req.body.key) {
          if (typeof req.body.key === 'object' && req.body.key.constructor === Array) {
              key = req.body.key;
          } else {
              key.push(req.body.key);
          }
      }
      var options = {
          keys: key
      };

      var fuse = new Fuse(joobs, options);
      var result = fuse.search(req.body.value);

      if(result.length > 0) {
          return res.json(result);
      }else {
          res.status(404).json({message: 'Result Not Found'});
      }
    });
};
*/


module.exports = router;