const model = require("../models/actor.model");

const addActor = async (req, res) => {
	const { name, age, contacts, description } = req.body;

	const candidate = await model.findOne({ name });

	if (candidate) {
		res.send("Actor already exists").status(403);
		return;
	}

	const keywords = req.body.keywords;
	const skills = req.body.skills;

	let photos;
	let video;

	if (req.files) {
		if (req.files.photos) {
			photos = req.files.photos.map((i) => i.filename);
		}

		if (req.files.video) {
			video = req.files.video[0].filename;
		}
	}

	await model.create({
		name,
		age,
		keywords,
		skills,
		photo_path: photos,
		video_path: video,
		contacts,
		description,
	});

	res.send("saved").status(201);
};

const findActorsByKeyword = async (req, res) => {
	const { keywords, skills, name, age } = req.body;

	let actors = [];

	if (name) {
		actors = await model.findOne({ name });
		res.json(actors);
		return;
	}

	if (age && !keywords && !skills) {
		actors = await model.find({ age });
		res.json(actors);
		return;
	}

	if (keywords || skills || age) {
		actors = await model.find({
			$text: { $search: keywords + " " + skills },
			age,
		});
	}

	res.json(actors);
};

const findAllActors = async (req, res) => {
	const actors = await model.find();

	res.json(actors);
};

const deleteActor = async (req, res) => {
	const { name } = req.params;

	const deleteActor = await model.deleteOne({ name });
};

const updateActor = async (req, res) => {};

module.exports = { deleteActor, addActor, findActorsByKeyword, findAllActors };
