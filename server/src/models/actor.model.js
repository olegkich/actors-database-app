const mongoose = require("mongoose");

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
});

actorSchema.index({ skills: "text", keywords: "text" });

module.exports = mongoose.model("actors", actorSchema);
