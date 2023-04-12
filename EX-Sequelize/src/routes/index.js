const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", async (req, res, next) => {
  try {
    const list = await Todo.findAll();
    res.render("index", { list: list });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findOne({
      where: {
        id: id,
      },
    });
    res.render("todo", { todo: todo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
