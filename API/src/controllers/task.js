const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { authenticateToken } = require("../middleware/auth");

// Créer une tâche (utilisateur connecté uniquement)
router.post("/", authenticateToken, async (req, res) => {
    const { title, list } = req.body;
    const userId = req.user._id;

    if (!title) {
      return res.status(400).send({ ok: false, error: "Le titre est requis" });
    }

    const task = await Task.create({ title, user: userId, list });
    res.status(201).send({ ok: true, data: task });
});

// Récupérer les tâches de l'utilisateur connecté
router.get("/", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId }).populate("list");
    res.status(200).send({ ok: true, data: tasks });
});

// Mettre à jour une tâche (vérifier que l'utilisateur est propriétaire)
router.put("/:id", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send({ ok: false, error: "Tâche non trouvée" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.status(403).send({ ok: false, error: "Accès non autorisé" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ ok: true, data: updatedTask });
});

// Supprimer une tâche (vérifier que l'utilisateur est propriétaire)
router.delete("/:id", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send({ ok: false, error: "Tâche non trouvée" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.status(403).send({ ok: false, error: "Accès non autorisé" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: true });
});

module.exports = router;