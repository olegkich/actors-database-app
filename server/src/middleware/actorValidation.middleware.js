const validationAddActor = (req, res, next) => {
	console.log(req.body, "hit");
	const { name, age, contacts, description } = req.body;

	if (!name || !age || !contacts || !description) {
		res.send(
			"name, age, contacts or description fields cannot be empty."
		).status(400);
		return;
	}

	if (isNaN(age)) {
		res.send("Age should be a number.").status(400);
		return;
	}

	if (name.length < 4 || name.length > 55) {
		res.send("Name length is either too short or too long").status(400);

		return;
	}

	if (req.files.video) {
		if (req.files.video[0].size > 10000000) {
			res.send("Maximum video size is 10MB").status(400);
			return;
		}
	}

	next();
	return;
};

module.exports = { validationAddActor };
