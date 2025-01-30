const Like = require('../models/Likes')
const BaseError = require('../errors/base_error')

const pressLike = async(req, res, next) => {
    try {
        const {userId, carId} = req.body
        if(!userId || !carId){
            throw BaseError.BadRequestError('Please provide user and car id')
        }

        const existingId = await Like.findOne({userId, carId})

        if(existingId){
            await Like.deleteOne({_id: existingId._id})
            const likeCount = await Like.countDocuments({carId})
            return res.status(200).json({message: 'Unliked successfully', count: likeCount})
        }else{
            const newLike = new Like({userId, carId})
            await newLike.save()
            
            const likeCount = await Like.countDocuments({carId})
            return res.status(201).json({message: 'Liked successfully', count: likeCount})

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "internal server error"})
    }
}

module.exports = pressLike
