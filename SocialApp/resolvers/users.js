const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError, ValidationError } = require("apollo-server");
const {validateRegisterInput} = require('../util/validators')

const User = require("../models/User");

module.exports = {
  Mutation: {
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.SECRET_TIME }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
