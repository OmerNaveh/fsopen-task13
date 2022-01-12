const Blog = require("./blog");
const User = require("./user");
User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true, logging: false });
User.sync({ alter: true, logging: false });
module.exports = { Blog, User };
