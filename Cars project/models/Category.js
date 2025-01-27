const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    brand:{
   type:String,
   }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
