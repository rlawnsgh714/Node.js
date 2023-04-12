const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

//회원가입
router.post("/join", isNotLoggedIn, join);

//로그인
router.post("/login", isNotLoggedIn, login);

//로그아웃
router.get("/logout", isLoggedIn, logout);

//카카오 로그인
router.get("/kakao", passport.authenticate("kakao"));

//카카오 로그인 결과
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
