const express = require("express");
const { isNotLoggedIn } = require("../middlewares");
const { renderJoin, renderMain } = require("../controller/page");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});
router.get("/join", isNotLoggedIn, renderJoin);

router.get("/", renderMain);

module.exports = router;
