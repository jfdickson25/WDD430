const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    imgUrl: { type: String },
    memories: { type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Memory'}] }
});

module.exports = mongoose.model('Person', personSchema);