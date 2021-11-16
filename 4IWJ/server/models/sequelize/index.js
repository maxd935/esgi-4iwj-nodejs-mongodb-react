const connection = require("../../lib/db");
const User = require("./User");
const UserMongo = require("../mongo/User");
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

const denormalizeUser = (user) => {
  User.findByPk(user.id, {
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id", "title", "createdAt"],
        limit: 5,
        order: [["createdAt", "DESC"]],
      },
    ],
  }).then((user) => {
    user = user.toJSON();
    new UserMongo({ _id: user.id, ...user }).save();
  });
};
const denormalizeArticle = (article) => {
  Article.findByPk(article.id, {
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "lastname", "firstname"],
      },
    ],
  }).then((article) => {
    article = article.toJSON();
    new ArticleMongo({ _id: article.id, ...article }).save();
  });
};
// Denormalization
User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);
User.addHook("afterDestroy", (user) => {
  UserMongo.deleteOne({ _id: user.id });
});

Article.addHook("afterCreate", (article) =>
  denormalizeUser({ id: article.authorId })
);
Article.addHook("afterUpdate", (article) =>
  denormalizeUser({ id: article.authorId })
);
Article.addHook("afterDestroy", (article) =>
  denormalizeUser({ id: article.authorId })
);

Article.addHook("afterCreate", (article) => denormalizeArticle(article));
Article.addHook("afterUpdate", (article) => denormalizeArticle(article));
Article.addHook("afterDestroy", (article) =>
  ArticleMongo.deleteOne({ _id: article.id })
);
User.addHook("afterUpdate", (user) =>
  User.findByPk(user.id, {
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id"],
      },
    ],
  }).then((user) => {
    user.articles.forEach((article) => {
      denormalizeArticle(article);
    });
  })
);
User.addHook("afterDestroy", (user) =>
  User.findByPk(user.id, {
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id"],
      },
    ],
  }).then((user) => {
    user.articles.forEach((article) => {
      ArticleMongo.deleteOne({ _id: article.id });
    });
  })
);

process.env.NODE_ENV === "dev" &&
  connection.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports.User = User;
module.exports.Article = Article;
module.exports.connection = connection;
