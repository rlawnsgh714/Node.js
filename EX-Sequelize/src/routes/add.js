const express = require("express");
const { Todo } = require("../models");

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    res.render("add");
  })
  .post(async (req, res, next) => {
    const job = req.body.job;
    try {
      Todo.create({
        job: job,
        done: 0,
      });
      res.redirect("/");
    } catch (ere) {
      next(err);
    }
    res.redirect("/");
  });

module.exports = router;
