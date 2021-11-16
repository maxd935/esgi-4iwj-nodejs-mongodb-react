const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { User: UserModel } = require("../models/sequelize");
const { createToken } = require("../lib/jwt");

const router = new Router();

router.post("/login", (req, res) => {
  const body = req.body;
  UserModel.findOne({
    where: {
      email: body.email,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(body.password, user.password).then((isMatch) => {
        if (isMatch) {
          createToken(user).then((token) => {
            res.json({ token: token });
          });
        } else {
          res.status(400).json({
            password: "Wrong password",
          });
        }
      });
    } else {
      res.status(400).json({
        username: "username not found",
      });
    }
  });
});

router.post("/users", (req, res) => {
  const body = req.body;
  UserModel.create(body)
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

module.exports = router;
