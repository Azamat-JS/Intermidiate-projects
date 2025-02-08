const Auth = require('../models/auth')
const BaseError = require('../errors/base_error')

const getProfile = async(req, res, next) => {
    const id = req.user.userId
    const profile = await Auth.findById(id)
    if(!profile){
       return next(BaseError.NotFoundError(`You don't have an account please register or login`))
    }
    res.status(200).json(profile)
}

const updateProfile = async(req, res, next) => {
   if(!req.user || !req.user.userId){
    return next(BaseError.BadRequestError('You should register or login before updating the profil'))
   }
   const userId = req.user.userId
   const updateData = {...req.body};   
   if(req.fileUrl){
    updateData.image = req.fileUrl
   }

    const profile = await Auth.findByIdAndUpdate(userId, updateData, 
        {new: true, runValidators: true})
        if(!profile){
           return next(BaseError.NotFoundError(`No user found with id: ${userId}`))
        }
        res.status(200).json({success: true, data: profile})
}

const deleteProfile = async(req, res) => {
    const {userId} = req.user
    const profile = await Auth.findByIdAndDelete(userId)
    if(!profile){
       return next(BaseError.NotFoundError('There is no profil with id: ' + user_info))
    }
    res.status(200).send('Profile was deleted successfully')
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}