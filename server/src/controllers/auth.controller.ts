import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { TypedRequestBody } from "../types";

const authorization = async (
	req: TypedRequestBody<{ password: string }>,
	res: Response
) => {
	const { password } = req.body;

	const hashedPassword = await bcrypt.hash(process.env.PASSWORD!, 5);

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

const generateToken = (password: string) => {
	const payload = { name: "ADMIN", password };

	return jwt.sign(payload, process.env.JWT_SECRET!);
};

export { authorization };
