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
    cStreet: {
      type: String,
      required: true
    },
    cTown: {
        type: String,
        required: true
    },
    cCounty: {
        type: String,
        required: true
    },
    cCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dStreet: {
        type: String,
        required: true
    },
    dTown: {
        type: String,
        required: true
    },
    dCounty: {
        type: String,
        required: true
    },
    dCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [String],
        required: false
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job', JobSchema);