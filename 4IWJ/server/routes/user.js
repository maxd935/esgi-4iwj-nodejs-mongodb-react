const { Router } = require("express");
const router = Router();

router.get("", (req, res) => {
  res.json([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "",
    },
    {
      id: 2,
      nom: "Durand",
      prenom: "Paul",
      email: "",
    },
  ]);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id === "1") {
    res.json({
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "",
    });
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id === "1") {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.post("", (req, res) => {
  const body = req.body;
  if (body.nom && body.prenom) {
    res.status(201).json(body);
  } else {
    const errors = {};
    if (!body.nom) {
      errors.nom = "Le nom est obligatoire";
    }
    if (!body.prenom) {
      errors.prenom = "Le prenom est obligatoire";
    }
    res.status(400).json(errors);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (id === "1") {
    if (body.nom && body.prenom) {
      res.json(body);
    } else {
      const errors = {};
      if (!body.nom) {
        errors.nom = "Le nom est obligatoire";
      }
      if (!body.prenom) {
        errors.prenom = "Le prenom est obligatoire";
      }
      res.status(400).json(errors);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
