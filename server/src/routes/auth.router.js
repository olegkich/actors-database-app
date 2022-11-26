const router = require("express").Router();

const { authorization } = require("../controllers/auth.controller");

router.post("/admin", authorization);

module.exports = router;
