const chalk = require("chalk");
import { Request, Response } from "express";
import model from "../models/actor.model";
import { TypedRequestBody } from "../types";

interface IAddActorRequest extends Request {
	name: string;
	age: number;
	contacts: string | undefined;
	description: string | undefined;
	files: any;
	keywords: string | undefined;
	skills: string | undefined;
}

const addActor = async (req: any, res: Response) => {
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
			photos = req.files.photos.map((i: any) => i.filename);
		}

		if (req.files.video) {
			video = req.files.video[0].filename;
		}
	}

	console.log(chalk.yellow("Adding actor with following values:"));
	console.log(
		chalk.blue(
			`Name: ${name}\nAge: ${age}\nKeywords: ${keywords}\nContacts: ${contacts}\nDescription: ${description}\nSkills: ${skills}\nphotos: ${JSON.stringify(
				photos
			)}\nvideo: ${JSON.stringify(video)}`
		)
	);

	await model.create({
		name,
		age,
		keywords,
		skills,
		photo_path: photos,
		video_path: video,
		contacts,
		description,
		marked: false,
	});

	res.send("saved").status(201);
};

const findActorsByKeyword = async (req: any, res: Response) => {
	const { keywords, skills, name, age } = req.body;

	let actors: any = [];

	if (name && name !== "") {
		let actors = await model.findOne({ name });

		if (actors === null) {
			res.status(404).send();
			return;
		}

		res.json(actors);
		return;
	}

	if (age && keywords.length === 0 && skills.length === 0) {
		actors = await model.find({ age });
		res.json(actors);
		return;
	}

	if (keywords || skills || age) {
		actors = await model.find({
			$text: { $search: keywords + " " + skills },
		});
	}

	if (actors.length === 0) {
		res.status(404).send();
	}

	res.json(actors);
};

const findAllActors = async (req: Request, res: Response) => {
	const actors = await model.find();

	res.json(actors);
};

const deleteActor = async (req: any, res: Response) => {
	const { name } = req.params;

	const deleteActor = await model.deleteOne({ name });

	res.send().status(200);
};

const updateActor = async (req: any, res: Response) => {
	const { id } = req.params;

	const candidate = await model.findById(id);

	if (!candidate) {
		res.send("This actor does not exist").status(403);
		return;
	}

	const { name, age, contacts, description, marked } = req.body;

	const keywords = req.body.keywords;
	const skills = req.body.skills;

	let photos;
	let video;

	if (req.files) {
		if (req.files.photos) {
			photos = req.files.photos.map((i: any) => i.filename);
		}

		if (req.files.video) {
			video = req.files.video[0].filename;
		}
	}

	console.log(req.body);

	console.log(
		name,
		age,
		keywords,
		skills,
		contacts,
		description,
		video,
		photos
	);
	const result = await model.updateOne(
		{ filter: id },
		{
			name,
			age,
			keywords,
			skills,
			photo_path: photos,
			video_path: video,
			contacts,
			description,
		}
	);

	console.log(result);

	res.send("updated").status(201);
};

export {
	deleteActor,
	addActor,
	findActorsByKeyword,
	findAllActors,
	updateActor,
};
