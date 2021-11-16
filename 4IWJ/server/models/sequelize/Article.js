const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
class Article extends Model {}

Article.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
  },
  {
    sequelize: connection,
    modelName: "article",
    paranoid: true,
  }
);

module.exports = Article;
