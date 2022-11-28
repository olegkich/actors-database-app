const router = require("express").Router();

const authRouter = require("./auth.router");
const actorRouter = require("./actors.router");

router.use("/authentication", authRouter);
router.use("/actors", actorRouter);

module.exports = router;
