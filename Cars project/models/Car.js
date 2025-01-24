const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Please provide model of a car"],
      enum: {
        values: ["CHEVROLET", "LAMBORGHINI", "LADA", "FERRARI"],
      },
    },
    price: {
      type: Number,
      required: [true, "Price of a car must be provided"],
    },
    engine: {
      type: Number,
      required: [true, "Please provide data on engine"],
    },
    year: {
      type: Number,
      required: [true, "Production year must be provided"],
    },
    color: {
      type: String,
      required: [true, "Please provide color of a car"],
    },
    distance: {
      type: Number,
      required: [true, "Please provide distance"],
    },
    gearbook: {
      type: String,
      required: [true, "Gearbook must be provided"],
    },
    description: {
      type: String,
      maxlength: [100, "You can write at most 100 characters"],
    },
    inner_photo: {
      type: String,
    },
    external_photo: {
      type: String,
    },
    model_photo: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
