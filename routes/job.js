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

function getByValue(arr, id) {

    var result = arr.filter(function(o){return o.id === id;});
    return result ? result[0] : null;
}

module.exports = router;