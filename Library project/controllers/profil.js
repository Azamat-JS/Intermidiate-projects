const Auth = require('../models/auth')
const BaseError = require('../errors/base_error')

const getProfile = async(req, res, next) => {
    const {id} = req.params
    const profile = await Auth.findById(id)
    if(!profile){
       return next(BaseError.NotFoundError(`There is no profil with id: ${id}`))
    }
    res.status(200).json(profile)
}

const updateProfile = async(req, res, next) => {
    const user_info = req.user.userId
    const profile = await Auth.findByIdAndUpdate(user_info, req.body, 
        {new: true, runValidators: true})
        if(!profile){
           return next(BaseError.NotFoundError(`There is no user with this id: ${user_info}`))
        }
        res.status(200).json(profile)
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