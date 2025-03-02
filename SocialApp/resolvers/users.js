const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError, ValidationError } = require("apollo-server");
const {validateRegisterInput, validateLoginInput} = require('../util/validators')

const User = require("../models/User");
function generateToken(user){
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            username:user.username
        },
        process.env.SECRET_KEY,
        {expiresIn: process.env.SECRET_TIME}
    )
}


module.exports = {
  Mutation: {
    async login(parent, {username, password}){
     const {errors, valid} = validateLoginInput(username, password)
     const user = await User.findOne({username});
           
     if(!valid){
        throw new UserInputError('Errors', {errors})
     }
     if(!user){
        errors.general = 'User not found';
        throw new UserInputError("User not found", {errors})
     }

     const match = await bcrypt.compare(password, user.password)
     if(!match){
        errors.general = 'Wrong credentials'
        throw new UserInputError("Wrong credentials", {errors})
     }

     const token = generateToken(user)

     return {
        ...user._doc,
        id: user._id,
        token
     };
    },
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
       const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword )
       if(!valid){
        throw new UserInputError('Errors', {errors})
       }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const existingEmail = await User.findOne({email});
      if(existingEmail){
        throw new UserInputError('Email is already taken', {
            errors: {email: 'This email is taken'}
        })
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
