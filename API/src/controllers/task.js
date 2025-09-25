const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Créer une tâche
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send({ ok: true, data: task });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({ ok: true, data: tasks });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

// Mettre à jour une tâche
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ ok: true, data: task });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(400).send({ ok: false, error });
  }
});

module.exports = router;