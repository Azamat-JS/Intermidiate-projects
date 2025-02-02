const Like = require("../models/Likes");
const BaseError = require("../errors/base_error");
const mongoose = require('mongoose')

const pressLike = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.carId)) {
      throw BaseError.BadRequestError("Invalid User ID or Car ID");
    }

    const userId = new mongoose.Types.ObjectId(req.body.userId);
    const carId = new mongoose.Types.ObjectId(req.body.carId);

    const existingLike = await Like.findOneAndDelete({ userId, carId });

    if (existingLike) {
      const likeCount = await Like.countDocuments({ carId });
      return res
        .status(200)
        .json({ message: "Unliked successfully", count: likeCount });
    }

    await Like.create({ userId, carId });

    const likeCount = await Like.countDocuments({ carId });
    return res
      .status(201)
      .json({ message: "Liked successfully", count: likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = pressLike;

