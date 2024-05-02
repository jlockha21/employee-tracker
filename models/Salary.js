const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    jobRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobRole',
        required: true,
    },
});

module.exports = mongoose.model('Salary', salarySchema);
