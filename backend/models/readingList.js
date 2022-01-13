const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");
class ReadingList extends Model {}
ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog",
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "ReadingList" }
);

module.exports = ReadingList;
