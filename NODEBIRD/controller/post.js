const { Post, Hashtag, User } = require("../models");

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
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
      res.send("수정 성공");
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await post.destroy();
      res.send("삭제 성공");
    } else {
      res.send("no authenticate");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
