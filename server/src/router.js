const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });
const shortid = require("shortid");

const {
	addActor,
	findActorsByKeyword,
	findAllActors,
	deleteActor,
} = require("./controllers/actor.controller");

const { authorization } = require("./controllers/auth.controller");

router.post("/auth/admin", authorization);
router.post(
	"/addActor",
	upload.fields([
		{
			name: "video",
			maxCount: 1,
		},
		{
			name: "photos",
			maxCount: 3,
		},
	]),
	addActor
);
router.post("/findActors", findActorsByKeyword);
router.get("/allActors", findAllActors);
router.get("/auth/oneTime");
// router.delete("/deleteActor/:id", deleteActor);

module.exports = router;
