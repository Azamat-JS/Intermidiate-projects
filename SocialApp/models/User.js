const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: {type:String, unique:true},
    password: {type:String, unique:true},
    email: String,
    createdAt: String
});

module.exports = model('User', userSchema)