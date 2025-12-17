const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { authenticateToken } = require("../middleware/auth");

// Créer une tâche (utilisateur connecté uniquement)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, list } = req.body;
    const userId = req.user._id;

    if (!title) {
      return res.send({ ok: false, error: "Le titre est requis" });
    }

    const task = await Task.create({ title, user: userId, list });
    res.send({ ok: true, data: task });
  } catch (error) {
    console.error("Erreur lors de la création de la tâche:", error);
    res.send({ ok: false, error: "Erreur lors de la création de la tâche" });
  }
});

// Récupérer les tâches de l'utilisateur connecté
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId }).populate("list");
    res.send({ ok: true, data: tasks });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    res.send({ ok: false, error: "Erreur lors de la récupération des tâches" });
  }
});

// Mettre à jour une tâche (vérifier que l'utilisateur est propriétaire)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.send({ ok: false, error: "Tâche non trouvée" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.send({ ok: false, error: "Accès non autorisé" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ ok: true, data: updatedTask });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
    res.send({ ok: false, error: "Erreur lors de la mise à jour de la tâche" });
  }
});

// Supprimer une tâche (vérifier que l'utilisateur est propriétaire)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.send({ ok: false, error: "Tâche non trouvée" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.send({ ok: false, error: "Accès non autorisé" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.send({ ok: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
    res.send({ ok: false, error: "Erreur lors de la suppression de la tâche" });
  }
});

// Récupérer les tâches par liste
router.get("/by-list/:listId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { listId } = req.params;
    
    const tasks = await Task.find({ user: userId, list: listId }).populate("list");
    res.send({ ok: true, data: tasks });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches par liste:", error);
    res.send({ ok: false, error: "Erreur lors de la récupération des tâches" });
  }
});

module.exports = router;