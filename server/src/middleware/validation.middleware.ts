import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

function authenticateToken(req: any, res: Response, next: any) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err: string, user: any) => {
		if (err) {
			console.log(err);
			return res.sendStatus(403);
		}

		req.user = user;

		next();
	});
}

export { authenticateToken };
