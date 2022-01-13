const express = require("express");
const { connectToDB } = require("./util/db");
const { PORT } = require("./util/config");
const errorhandler = require("./middlewares/errorhandler");
const blogRouter = require("./routers/blogRouter");
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/login");
const authorRouter = require("./routers/authorRouter");
const readingListRouter = require("./routers/readingListRouter");
const app = express();

app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/readinglist", readingListRouter);
app.use("/api/authors", authorRouter);
app.use("/api/users", userRouter);
app.use(errorhandler);
const start = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
};
start();
