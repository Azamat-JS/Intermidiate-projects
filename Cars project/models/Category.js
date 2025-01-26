const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    brand:{
   type:String,
   enum:{
    values: ['CHEVROLET', 'LADA', 'LAMBORGHINI', 'FERRARI'],
    message: '{VALUE} is not supported'
   }
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

categorySchema.statics.findByFullName = function (name) {
  return this.find({ name });
};

module.exports = mongoose.model("Category", categorySchema);
