import { Router } from "express";

import { authorization } from "../controllers/auth.controller";

const router = Router();

router.post("/admin", authorization);

export { router };
