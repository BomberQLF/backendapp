const express = require("express");
const router = express.Router();
const List = require("../models/list");
const Task = require("../models/task"); // Ajoutez cette ligne
const { authenticateToken } = require("../middleware/auth");

// Créer une liste (utilisateur connecté uniquement)
router.post("/", authenticateToken, async (req, res) => {
    const { name  } = req.body;
    const userId = req.user._id;

    if (!name) {
      return res.send({ ok: false, error: "Le nom est requis" });
    }

    const list = await List.create({name, user: userId });
    res.send({ ok: true, data: list });
});

// Récupérer les listes de l'utilisateur connecté
router.get("/", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const lists = await List.find({ user: userId });
    res.send({ ok: true, data: lists });
});

// Mettre à jour une liste (vérifier que l'utilisateur est propriétaire)
router.put("/:id", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.send({ ok: false, error: "Liste non trouvée" });
    }

    if (list.user.toString() !== userId.toString()) {
      return res.send({ ok: false, error: "Accès non autorisé" });
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ ok: true, data: updatedList });
});

// Supprimer une liste (vérifier que l'utilisateur est propriétaire)
router.delete("/:id", authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.send({ ok: false, error: "Liste non trouvée" });
    }

    if (list.user.toString() !== userId.toString()) {
      return res.send({ ok: false, error: "Accès non autorisé" });
    }

    // Supprimer toutes les tâches associées à cette liste
    await Task.deleteMany({ list: req.params.id, user: userId });
    
    // Supprimer la liste
    await List.findByIdAndDelete(req.params.id);
    
    res.send({ ok: true });
});

module.exports = router;