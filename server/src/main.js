// imports
const express = require("express");

const mognoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");

require("dotenv").config();

// constants
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const corsOptions = { credentials: true, origin: "http://localhost:3000" };

// db
mognoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mognoose.connection;

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

module.exports = { upload };
