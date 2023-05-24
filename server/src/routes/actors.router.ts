import { Router } from "express";
import multer from "multer";

const upload = multer({ dest: "public/" });

import {
	addActor,
	findActorsByKeyword,
	findAllActors,
	deleteActor,
	updateActor,
} from "../controllers/actor.controller";

import { validationAddActor } from "../middleware/actorValidation.middleware";

const router = Router();

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
router.delete("/:name", deleteActor);
router.put(
	"/:id",
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
	updateActor
);

export { router };
