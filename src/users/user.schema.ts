import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
	id: String,
	username: {
		type: String,
		min: 3,
		required: true
	},
	nickname: {
		type: String,
		min: 5,
		required: true
	},
	password: {
		type: String,
		min: 6,
		required: true
	},
	role: String,
	date: Date
});
