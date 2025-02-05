const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Category name must be provided'],
        enum:{
         values:["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri"],
         message: "{VALUE} is not supported"
        }
    }
},{
versionKey: false
})

module.exports = mongoose.model('Category', categorySchema)