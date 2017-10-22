var jobs = require('../models/jobs');
var express = require('express');
var router = express.Router();

router.findAll = function(req, res) {
    // Return a JSON representation of our list
    res.json(jobs);
};

router.findOne = function(req,res){

    var job = getByValue(jobs,req.params.id);

    if(job !== null)
        res.json(job);
    else
        res.json({message:'Job Not Found'});
};

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

/*
router.updateJob = function(req,res) {
    var job = getByValue(jobs, req.params.id);

    var oldTitle = job.title;
    var newTitle = req.body.title;

    oldTitle = newTitle;

    if (oldTitle !== newTitle)
        res.json({message : 'Title Updated'});
    else
        res.json({message : 'Title not Updated '});

};
*/

router.deleteJob = function(req, res){

    var job = getByValue(jobs, req.params.title);
    var index = jobs.indexOf(job);

    var currentSize = jobs.length;
    jobs.splice(index, 1);

    if((currentSize - 1) === jobs.length)
        res.json({message:'Job Deleted!'});
    else
        res.json({message:'Job Not Deleted!'});
};


function getByValue(arr, id) {
    var result = arr.filter(function(o){return o.id.toString() === id.toString();});
    return result ? result[0] : null;
}

module.exports = router;