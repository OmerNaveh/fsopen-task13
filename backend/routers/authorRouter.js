const router = require("express").Router();
const { validate } = require("../middlewares/blogMiddleware");
const { Blog } = require("../models/index");
const { fn, col } = require("sequelize");

router.get("/", validate, async (req, res, next) => {
  try {
    const all = await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("author")), "articles"],
        [fn("SUM", col("likes")), "total_likes"],
      ],
      group: "author",
      order: [[fn("SUM", col("likes")), "desc"]],
    });
    res.send(JSON.stringify(all));
  } catch (error) {
    console.log(error);
    next("internal server errors");
  }
});
module.exports = router;
