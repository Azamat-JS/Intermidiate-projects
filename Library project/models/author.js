const mongoose = require('mongoose')


const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "name must be provided"],
        minlength: [6, 'name must be at least 6 letters'],
        maxlength: [40, 'name must not be exceed 40 letters'],
        set: value => value.trim().toUpperCase()
    },
    birth_year:{
     type:Number,
     required: [true, 'Birth date must be provided'],
     maxlength:[4, 'You can not write more than 10 letters']
    },
    death_year:{
       type:Number,
       maxlength: [4, 'You can not write more than 10 characters'],
    },
    nation:{
     type:String,
     maxlength:[30, 'You can not write more than 30 letters'],
     trim:true
    }
},
{
    versionKey:false,
    timestamps:true
} 
)

AuthorSchema.statics.findByFullName = function(name){
    return this.find({name})
}

module.exports = mongoose.model("Author", AuthorSchema)