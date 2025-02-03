const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'username must be provided'],
        minlength: [3, 'username must be at least 3 characters'],
        maxlength: [30, 'username must be at most 30 characteres'],
    },
    email: {
        type:String,
        required: [true, "Email must be provided"],
        maxlength:[50, 'Email must be at most 50 characters'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Password must be provided'],
        minlength: [6, 'password must be at least 6 characters']
    },
    profile_image:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default: []
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("User", userSchema)