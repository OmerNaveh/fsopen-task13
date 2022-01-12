const express = require("express");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const router = express.Router();
router.post("/", async (req, res, next) => {
  const { username } = req.body;
  if (!username) next("missing params");
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) next("Not Found!");
    const token = jwt.sign(user.id, SECRET);
    res.send({ token, name: user.name });
  } catch (error) {
    next("internal server errors");
  }
});
module.exports = router;
