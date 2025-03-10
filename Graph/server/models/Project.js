const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ['Not Started', 'In Progress', 'Completed'],
            message: '{VALUE} is not supported',
        },
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', 
    },
});

module.exports = mongoose.model("Project", ProjectSchema);
