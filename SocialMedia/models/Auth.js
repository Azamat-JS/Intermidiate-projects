const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username:{
        type:String
    }
})