const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 12);
      if (!bcrypt.compare(user.password, req.body.originPassword)) {
        res.send("다른 비밀번호 입니다");
      }
      await user.update({ nick: req.body.nick, password: hash });
    }

    await user.update({ nick: req.body.nick });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
