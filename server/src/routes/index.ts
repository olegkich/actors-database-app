import { Router } from "express";
import { router as authRouter } from "./auth.router";
import { router as actorRouter } from "./actors.router";

import { authenticateToken } from "../middleware/validation.middleware";

const router = Router();

router.use("/authentication", authRouter);
router.use("/actors", authenticateToken, actorRouter);

export { router };
