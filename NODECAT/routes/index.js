const express = require("express");
const { getMyPosts, searchByHashtag } = require("../controller");

const router = express.Router();

router.get("/myposts", getMyPosts);

router.get("/search/:hashtag", searchByHashtag);

module.exports = router;
