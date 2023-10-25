const mongoose = require('mongoose');

const TrainSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Train', TrainSchema);
