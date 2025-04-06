import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: mongoose.SchemaTypes.String,
			required: true,
		},
		email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
		password: { type: mongoose.SchemaTypes.String, required: true },
		role: {
			type: mongoose.SchemaTypes.String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true, versionKey: false, collection: 'user' }
)

export default mongoose.model('User', UserSchema)
