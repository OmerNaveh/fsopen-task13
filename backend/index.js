require("dotenv").config();
const express = require("express");
const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize");
const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
);
// Blog.sync(); // creates table by class created above

const displayAll = async () => {
  try {
    // await sequelize.authenticate();
    // const blogs = await sequelize.query("SELECT * FROM blogs", {
    //   type: QueryTypes.SELECT,
    // });
    const blogs = await Blog.findAll();
    return JSON.stringify(blogs, null, 2);
    // sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
app.use(express.json());
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.send(JSON.stringify(blogs, null, 2));
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});
app.post("/api/blogs", async (req, res) => {
  const { author, title, url } = req.body;
  if (!author || !title || !url) {
    res.status(400).send("missing params");
    return;
  }
  try {
    await Blog.create({ author, title, url });
    res.send("created successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});
app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("missing params");
  try {
    await Blog.destroy({ where: { id } });
    res.send(`deleted ${id}!`);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});
app.listen(4000, () => {
  console.log(`running on 4000`);
});
