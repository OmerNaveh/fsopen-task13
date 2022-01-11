const express = require("express");
const blogRouter = require("./routers/blogRouter");
const { connectToDB } = require("./util/db");
const { PORT } = require("./util/config");
const errorhandler = require("./middlewares/errorhandler");
const app = express();

app.use(express.json());
app.use("/api/blogs", blogRouter);
const start = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
};
app.use(errorhandler);
start();
