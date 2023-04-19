const jwt = require("jsonwebtoken");
const { Domain, User, Post, Hashtag } = require("../models");

exports.createToken = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m", // 30분
        issuer: "nodebird",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};

exports.getPosts = (req, res) => {
  Post.findAll({
    include: { model: User, attribute: ["nick", "id"] },
  })
    .then((posts) => {
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
};

exports.getMyPosts = (req, res) => {
  Post.findAll({
    where: { userId: res.locals.decoded.id },
    include: { model: User, attribute: ["nick", "id"] },
  })
    .then((posts) => {
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
};

exports.getPostsByHashtag = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { content: req.query.hashtag },
      include: { model: User, attribute: ["nick", "id"] },
    });
    return res.json({
      include: { model: User, attribute: ["nick", "id"] },
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    Post.update(
      {
        content: req.body.content,
      },
      { where: { id: req.params.id } }
    ).then((result) => {
      return res.render("main", { twits: result });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.parms.id);
    const post = await Post.findOne({ where: { id: req.params } });
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await post.destroy();
      return res.status(200).json({
        code: 200,
        message: "삭제 성공",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
