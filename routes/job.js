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

/*
router.addJob = function(req, res) {

    var id = Math.floor((Math.random()*100000 + 1));
    var currentSize = jobs.length;
    jobs.push({
        "id": id,
        "title" : req.body.title,
        "desc" : req.body.desc,
        "size" : req.body.size,
        "cLoc" : req.body.cLoc,
        "dLoc" : req.body.dLoc,
        "dTime" : req.body.dTime,
        "price" : req.body.price,
        "photos" : [
            req.body.photos
        ]});

    if((currentSize + 1) === jobs.length)
        res.json({ message: 'Job Added!'});
    else
        res.json({ message: 'Job Not Added!'});

};
*/

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

router.updateJob = function(req,res) {

    var job = getByValue(jobs, req.params.id);
    var oldTitle = job.title;
    var newTitle = req.body.title;

    job.title = newTitle;

    if (oldTitle !== newTitle)
        res.json({message : 'Title Updated'});
    else
        res.json({message : 'Title not Updated '});
};

router.deleteJob = function(req, res){

    var job = getByValue(jobs, req.params.id);
    var index = jobs.indexOf(job);

    var currentSize = jobs.length;
    jobs.splice(index, 1);

    if((currentSize - 1) === jobs.length)
        res.json({message:'Job Deleted!'});
    else
        res.json({message:'Job Not Deleted!'});
};


function getByValue(arr, id) {

    var result = arr.filter(function(o){return o.id === id;});
    return result ? result[0] : null;

}

module.exports = router;