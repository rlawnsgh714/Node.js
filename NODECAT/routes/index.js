const express = require("express");
const {
  getPosts,
  getMyPosts,
  searchByHashtag,
  deletePost,
} = require("../controller");

const router = express.Router();

router.get("/", getPosts);

router.get("/myposts", getMyPosts);

router.get("/search", searchByHashtag);

router.post("/update", searchByHashtag);

router.post("/delete/:id", deletePost);

module.exports = router;
