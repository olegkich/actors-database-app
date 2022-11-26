const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });

const {
	addActor,
	findActorsByKeyword,
	findAllActors,
	deleteActor,
} = require("../controllers/actor.controller");

router.post(
	"/add",
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

router.post("/find", findActorsByKeyword);
router.get("/all", findAllActors);

module.exports = router;
