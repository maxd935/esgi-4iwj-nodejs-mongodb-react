const { Router } = require("express");
const { Article: ArticleModel } = require("../models/sequelize/index");
const { User: UserModel } = require("../models/sequelize/index");
const router = Router();

router.get("", (req, res) => {
  ArticleModel.findAll({
    where: req.query,
    include: [
      {
        model: UserModel,
        as: "author",
      },
    ],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  ArticleModel.findByPk(id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  ArticleModel.destroy({
    where: {
      id: id,
    },
  }).then((nbRow) => {
    if (nbRow) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post("", (req, res) => {
  const body = req.body;
  ArticleModel.create(body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(err);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ArticleModel.update(body, { where: { id: id }, returning: true })
    .then(([, [user]]) => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(err);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
});

module.exports = router;
