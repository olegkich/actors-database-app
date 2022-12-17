const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "public/" });

// controllers
const {
	addActor,
	findActorsByKeyword,
	findAllActors,
	deleteActor,
	updateActor,
} = require("../controllers/actor.controller");

// middleware
const {
	validationAddActor,
} = require("../middleware/actorValidation.middleware");

// routing
router.post(
	"/",
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
router.get("/", findAllActors);
router.delete("/:id", deleteActor);
router.put("/:id", updateActor);

module.exports = router;
