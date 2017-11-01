var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: true
    },
    cLoc: {
        type: String,
        required: true
    },
    cCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dLoc: {
        type: String,
        required: true
    },
    dCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [String],
        requires: false
    }
});

module.exports = mongoose.model('Job', JobSchema);