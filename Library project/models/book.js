const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  genre:{
    type:String,
    required: [true, 'genre of the book must be provided'],
    enum:{
      values:["comedy", "drama", "tragedy", "science", "philosophy", "detective"],
      message: "{VALUE} is not supported"
    }
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  author_info:{
    type:mongoose.Types.ObjectId,
    ref: "Author",
    required:[true, "Author's info must be provided"]
  },
  image:{
    type: String
  }
},
{
  versionKey:false,
  timestamps:true
}
);

module.exports = mongoose.model("Book", BookSchema);
