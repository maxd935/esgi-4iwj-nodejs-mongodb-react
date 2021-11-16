const connection = require("../../lib/db");
const User = require("./User");
const Article = require("./Article");

// One-to-One
// Article.belongsTo(User);
// User.hasOne(Article);

// One-to-Many
Article.belongsTo(User, { as: "author", foreignKey: "authorId" });
User.hasMany(Article, { as: "articles", foreignKey: "authorId" });

// Many-to-Many
// Article.belongsToMany(User, { through: "ArticleUser" });
// User.belongsToMany(Article, { through: "ArticleUser" });

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports.User = User;
module.exports.Article = Article;
module.exports.connection = connection;
