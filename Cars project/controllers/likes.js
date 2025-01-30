const Like = require("../models/Likes");
const BaseError = require("../errors/base_error");

const pressLike = async (req, res, next) => {
  try {
    const { userId, carId } = req.body;
    if (!userId || !carId) {
      throw BaseError.BadRequestError("User ID and Car ID are required");
    }

    const existingLike = await Like.findByIdAndDelete({ userId, carId });

    if (existingLike) {
      const likeCount = await Like.countDocuments({ carId });
      return res
        .status(200)
        .json({ message: "Unliked successfully", count: likeCount });
    }

    await Like.create({userId, carId})
      
      const likeCount = await Like.countDocuments({ carId });
      return res
        .status(201)
        .json({ message: "Liked successfully", count: likeCount });
    } catch (error) {
    console.error(error);
      return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = pressLike;
