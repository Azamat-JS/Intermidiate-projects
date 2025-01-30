const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car Id must be provided']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: [true, 'User id must be provided']
    }
},
{
   versionKey:false,
   timestamps: true
})

module.exports = mongoose.model('Like', likeSchema)