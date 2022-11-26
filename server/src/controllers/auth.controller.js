const bcrypt = require("bcrypt");

const authorization = async (req, res) => {
	const { password } = req.body;

	const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 5);

	const isAuthorized = await bcrypt.compare(password, hashedPassword);

	if (!isAuthorized) {
		res.status(403);
		res.send("Authorization failed");

		return;
	}

	res.send("Authorization Successful");
};

module.exports = { authorization };
