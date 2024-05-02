const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
});

module.exports = mongoose.model('JobRole', jobRoleSchema);
