const { Router } = require("express");
const {
  User: UserModel,
  Article: ArticleModel,
} = require("../models/sequelize/index.js");
const router = Router();
const bcrypt = require("bcryptjs");
const { createToken } = require("../lib/jwt.js");

router.get("", (req, res) => {
  UserModel.findAll({
    where: req.query,
    include: [{ model: ArticleModel, as: "articles" }],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByPk(id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.destroy({
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

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  UserModel.update(body, {
    where: { id: id },
    returning: true,
    individualHooks: true,
  })
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
