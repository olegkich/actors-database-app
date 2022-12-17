const router = require("express").Router();

const authRouter = require("./auth.router");
const actorRouter = require("./actors.router");

const authenticateToken = require("../middleware/validation.middleware");

router.use("/authentication", authRouter);
router.use("/actors", authenticateToken, actorRouter);

module.exports = router;
