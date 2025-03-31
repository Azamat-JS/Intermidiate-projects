const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name should be provided']
    },
    email:{
        type:String,
        required:[true, 'Email must be provided'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password must be provided'],
    },
    profileImageUrl: {
        type:String,
        default:null
    },
    role: {
        type:String,
        enum:['admin', 'member'],
        default: 'member'
    }
},
{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model('User', UserSchema);