import { Request, Response } from "express";

const validationAddActor = (req: Request, res: Response, next: any) => {
	const { name, age, contacts, description } = req.body;

	if (!name || !age) {
		res.status(400);
		res.send("name and age fields cannot be empty.");
		return;
	}

	if (isNaN(age)) {
		res.status(400);
		res.send("Age should be a number.");
		return;
	}

	if (name.length < 4 || name.length > 55) {
		res.status(400);
		res.send("Name length is either too short or too long");

		return;
	}

	//@ts-ignore
	if (req.files.video) {
		//@ts-ignore
		if (req.files.video[0].size > 10000000) {
			res.send("Maximum video size is 10MB").status(400);
			return;
		}
	}

	next();
	return;
};

export { validationAddActor };
