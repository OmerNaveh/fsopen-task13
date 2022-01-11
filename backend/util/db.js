const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("../util/config");
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to DB");
  } catch (error) {
    console.log("failed connecting to DB");
  }
};
module.exports = { connectToDB, sequelize };
