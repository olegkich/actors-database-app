import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/index";
import cors from "cors";

import { config } from "dotenv";

config();

const port: string = process.env.PORT!;
const DB_URL: string = process.env.DB_URL!;
const corsOptions = { credentials: true, origin: "http://localhost:3000" };

// db
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", (err) => {
	console.error(err);
});

db.once("connected", () => {
	console.log("connection succesful.\n", DB_URL);
});

// server

const server = express();

server.use(express.json());
server.use(cors(corsOptions));
server.use(express.static("public/"));

server.use(router);

server.listen(port, () => {
	console.log("listening on port: ", port);
});
