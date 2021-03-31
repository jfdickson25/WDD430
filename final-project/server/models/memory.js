const mongoose = require('mongoose');

const memorySchema = mongoose.Schema({
    event: { type: String, required: true},
    year: { type: Number, required: true }
});

module.exports = mongoose.model('Memory', memorySchema);