const jwt = require("jsonwebtoken");
const { Blog } = require("../models/index");
const { SECRET } = require("../util/config");
const getById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) next("missing params");
  try {
    req.blog = await Blog.findByPk(id);
  } catch (error) {
    next("Not Found!");
  }
  next();
};

const validate = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded;
    next();
  } catch (error) {
    next("invalid token");
  }
};

module.exports = { getById, validate };
