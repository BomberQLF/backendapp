const express = require("express");
const router = express.Router();
const List = require("../models/list");

// Créer une liste
router.post("/", async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).send({ ok: true, data: list });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

// Récupérer toutes les listes
router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).send({ ok: true, data: lists });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

// Mettre à jour une liste
router.put("/:id", async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ ok: true, data: list });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

// Supprimer une liste
router.delete("/:id", async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

module.exports = router;