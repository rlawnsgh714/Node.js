const express = require("express");

const { verifyToken, apiLimiter } = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
  updatePost,
  deletePost,
  getPosts,
} = require("../controllers/v2");

const router = express.Router();

// router.post("/token", apiLimiter, createToken);

// router.get("/test", apiLimiter, verifyToken, tokenTest);

// router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);

// router.get("/posts/hashtag/:title", apiLimiter, verifyToken, getPostsByHashtag);

router.post("/token", createToken);

router.get("/test", verifyToken, tokenTest);

router.get("/posts", verifyToken, getPosts);

router.get("/posts/my", verifyToken, getMyPosts);

router.get("/posts/hashtag", verifyToken, getPostsByHashtag);

router.get("/posts/update/:id", verifyToken, updatePost);

router.get("/posts/delete/:id", verifyToken, deletePost);

module.exports = router;
