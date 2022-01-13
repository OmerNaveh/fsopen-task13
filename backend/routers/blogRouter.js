const express = require("express");
const { Blog, User } = require("../models/index");
const { Op } = require("sequelize");
const { getById, validate } = require("../middlewares/blogMiddleware");
const router = express.Router();
router.get("/", validate, async (req, res, next) => {
  try {
    const where = {};
    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.substring]: req.query.search.toLowerCase() } },
        { author: { [Op.substring]: req.query.search.toLowerCase() } },
      ];
    }
    const blogs = await Blog.findAll({
      attributes: { exclude: ["UserId"] },
      include: { model: User, attributes: { exclude: ["id"] } },
      where,
      order: [["likes", "desc"], ["id"]],
    });
    res.send(JSON.stringify(blogs, null, 2));
  } catch (error) {
    next("internal server errors");
  }
});

router.post("/", validate, async (req, res, next) => {
  const { author, title, url, year = new Date().getFullYear() } = req.body;
  if (!author || !title || !url) {
    next("missing params");
    return;
  }
  try {
    await Blog.create({ author, title, url, UserId: req.userId, year });
    res.send("created successfully");
  } catch (error) {
    if (error.errors) return res.status(400).send(error.errors[0].message);
    next("something went wrong!");
  }
});

router.delete("/:id", [validate, getById], async (req, res, next) => {
  try {
    console.log(req.blog.UserId, "-", req.userId);
    if (req.blog) {
      if (req.blog.UserId != req.userId) {
        return next("unauthorized");
      }
      await req.blog.destroy();
      return res.send(`deleted !`);
    } else throw "";
  } catch (error) {
    next("something went wrong!");
  }
});

router.put("/:id", [validate, getById], async (req, res, next) => {
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
