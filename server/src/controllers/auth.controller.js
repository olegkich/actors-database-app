const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authorization = async (req, res) => {
	const { password } = req.body;

	const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 5);

	const isAuthorized = await bcrypt.compare(password, hashedPassword);

	if (!isAuthorized) {
		res.status(403);
		res.send("Authorization failed");

		return;
	}

	const token = generateToken(hashedPassword);

	res.status(200);
	res.json({ token });
	return;
};

const generateToken = (password) => {
	const payload = { name: "ADMIN", password };

	return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = { authorization };
