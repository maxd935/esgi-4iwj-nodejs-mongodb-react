const { Router } = require("express");
const UserModel = require("../models/mongo/product");
const router = Router();

router.get("", (req, res) => {
  UserModel.find().then((users) => {
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById(id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id).then((user) => {
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post("", (req, res) => {
  const body = req.body;
  const user = new UserModel(body);
  user
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
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
  UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(err);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
});

module.exports = router;
