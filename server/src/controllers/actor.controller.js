const model = require("../models/actor.model");

const shortid = require("shortid");

const addActor = async (req, res) => {
	const { name, age, contacts, description } = req.body;

	const candidate = await model.findOne({ name });

	if (candidate) {
		res.send("Actor already exists").status(403);
		return;
	}

	const keywords = JSON.parse(req.body.keywords);

	const photos = req.files.photos.map((i) => i.filename);
	const video = req.files.video[0];

	await model.create({
		name,
		age,
		keywords,
		photo_path: photos,
		video_path: video.filename,
		contacts,
		description,
	});

	res.send("saved").status(201);
};

const findActorsByKeyword = async (req, res) => {
	const { keywords, name, age } = req.body;
	let actors;
	if (keywords) {
		console.log(keywords);
		try {
			actors = await model.find({ $text: { $search: keywords } });
		} catch (err) {
			console.log(err);
		}
		res.json(actors);
	}

	if (name) {
	}
};

const findAllActors = async (req, res) => {
	const actors = await model.find();

	res.json(actors);
};

const deleteActor = async (req, res) => {
	const { name } = req.params;

	const deleteActor = await model.deleteOne({ name });
};

module.exports = { deleteActor, addActor, findActorsByKeyword, findAllActors };
