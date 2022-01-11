const { Blog } = require("../models/index");
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

module.exports = { getById };
