const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text:{
        type:String,
        required:[true, 'Text must be provided']
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const taskSChema = mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Title must be provided']
    },
    priority:{
        type:String,
        enum:['Low', 'Medium', 'High'],
        default:'Medium'
    },
    status:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed'],
        default:'Pending'
    },
    description:{type:String},
    dueDate:{
        type:Date,
        required:[true, 'Date must be provided']
    },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createdBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    attachments:{type:String},
    todoChecklist:[todoSchema],
    progress:{
        type:Number,
        default:0
    }
},
{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model('Task', taskSChema)