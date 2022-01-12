const express = require("express");
const { User, Blog } = require("../models/index");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, username } = req.body;
  if (!name || !username) next("missing params");
  try {
    await User.create({ name, username });
    res.send("created!");
  } catch (error) {
    if (error.errors) return res.send(error.errors[0].message);
    next("internal server errors");
  }
});
router.get("/", async (req, res, next) => {
  try {
    const all = await User.findAll({
      attributes: { exclude: ["id"] },
      include: { model: Blog, attributes: { exclude: ["id", "userId"] } },
    });
    res.send(JSON.stringify(all));
  } catch (error) {
    next("internal server errors");
  }
});
router.put("/:username", async (req, res, next) => {
  const { username } = req.params;
  if (!username || !req.body) next("missing params");
  try {
    await User.update({ ...req.body }, { where: { username } });
    res.send(`updated!`);
  } catch (error) {
    next("internal server errors");
  }
});

module.exports = router;
