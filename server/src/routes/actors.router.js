const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });

// controllers
const {
	addActor,
	findActorsByKeyword,
	findAllActors,
	deleteActor,
} = require("../controllers/actor.controller");

// middleware
const {
	validationAddActor,
} = require("../middleware/actorValidation.middleware");

// routing
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
	validationAddActor,
	addActor
);

router.post("/find", findActorsByKeyword);
router.get("/all", findAllActors);

module.exports = router;
