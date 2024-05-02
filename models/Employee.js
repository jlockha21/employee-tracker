const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    salary: {
        type: Number, // Change to Number
        required: true, // Add 'required' if necessary
    },
});

module.exports = mongoose.model('Employee', employeeSchema);
