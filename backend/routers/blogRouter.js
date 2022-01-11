const express = require("express");
const { Blog } = require("../models/index");
const { getById } = require("../middlewares/blogMiddleware");
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.send(JSON.stringify(blogs, null, 2));
  } catch (error) {
    next("internal server errors");
  }
});

router.post("/", async (req, res, next) => {
  const { author, title, url } = req.body;
  if (!author || !title || !url) {
    next("missing params");
    return;
  }
  try {
    await Blog.create({ author, title, url });
    res.send("created successfully");
  } catch (error) {
    next("something went wrong!");
  }
});

router.delete("/:id", getById, async (req, res, next) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
      return res.send(`deleted !`);
    } else throw "";
  } catch (error) {
    next("something went wrong!");
  }
});

router.put("/:id", getById, async (req, res, next) => {
  try {
    if (req.blog) {
      const { likes } = req.body;
      if (!likes) next("missing params");
      await req.blog.update({ likes });
      return res.send(`updated !`);
    } else throw "";
  } catch (error) {
    next("something went wrong!");
  }
});

module.exports = router;
