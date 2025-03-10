const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = model('User', UserSchema)
