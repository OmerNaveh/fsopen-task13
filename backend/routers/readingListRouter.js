const { validate } = require("../middlewares/blogMiddleware");
const { getById } = require("../middlewares/readingListMiddleware");
const { ReadingList } = require("../models/index");

const router = require("express").Router();

router.post("/", validate, async (req, res, next) => {
  const { blogId, userId } = req.body;
  if (!blogId || !userId) return next("missing params");
  try {
    await ReadingList.create({ blogId, userId });
    res.send("added!");
  } catch (error) {
    if (error.errors) return res.status(400).send(error.errors[0].message);
    next("internal server errors");
  }
});
router.put("/:id", [validate, getById], async (req, res, next) => {
  const { read } = req.body;
  if (!read) return next("missing params");
  if (req.readingList.dataValues.userId != req.userId)
    return next("unauthorized");
  try {
    await req.readingList.update({ read });
    res.send("updated!");
  } catch (error) {
    next("something went wrong!");
  }
});
module.exports = router;
