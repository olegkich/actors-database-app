import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
		unique: true,
	},
	age: {
		required: true,
		type: Number,
	},
	description: {
		type: String,
	},
	contacts: {
		type: String,
	},
	keywords: {
		type: String,
	},
	skills: {
		type: String,
	},
	photo_path: {
		type: [{ type: String }],
	},
	video_path: {
		type: String,
	},
	marked: {
		type: Boolean,
	},
});

actorSchema.index({ skills: "text", keywords: "text" });

export default mongoose.model("actors", actorSchema);
