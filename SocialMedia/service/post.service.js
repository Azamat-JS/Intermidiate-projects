const User = require('../models/User')

class UserController {
    async create(userInfo){
        const newUser = await User.create(userInfo)
        return newUser
    }

    async getAll(){
        const data = await User.find()
        return data
    }

    async getOne(id){
        const oneUser = await User.findById(id)
        return oneUser
    }

    async update(id, userInfo){
        const editUser = await User.findByIdAndUpdate(id, userInfo, {
            new:true, runValidators:true})
        return editUser
    }

    async delete(id){
        const deleteUser = await User.findByIdAndDelete(id)
        return deleteUser
    }
}

module.exports = new UserController()