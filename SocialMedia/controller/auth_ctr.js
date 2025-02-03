const User = require('../models/User')
const bcrypt = require('bcryptjs')

const register = async(req, res) => {
  try {
    const {password, email, username} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await new User({
        username,
        email,
        password: hashPassword
    })
    newUser.save()
    res.status(201).json({message: 'user created successfully', newUser})
  } catch (error) {
    console.log(error);
    res.status(500).json({err: error})
  }
}

module.exports = register