const express = require("express");

const { isLoggedIn } = require("../middlewares");
const { follow, unfollow, update } = require("../controller/user");

const router = express.Router();

// POST /user/:id/follow
router.post("/:id/follow", isLoggedIn, follow);

router.post("/:id/unfollow", isLoggedIn, unfollow);

router.post("/update", isLoggedIn, update);

module.exports = router;
