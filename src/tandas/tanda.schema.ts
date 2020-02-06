import * as mongoose from 'mongoose';

export const tandaSchema = new mongoose.Schema({
	date: Date,
	description: String,
	author: { id: String, name: String },
	orchestra: String,
	speed: String,
	genre: String,
	tracks: Object,
	isPublic: Boolean,
	periodStart: Number,
	periodEnd: Number,
	isInstrumental: Boolean,
	singer: String
});
