const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Route d'inscription
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).send({ ok: false, message: "Champs manquants" });
  }
  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ ok: false, message: "Email déjà utilisé" });
    }
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crée l'utilisateur avec le mot de passe hashé
    const user = await User.create({ email, password: hashedPassword, username });
    return res.status(201).send({ ok: true, data: user });
  } catch (error) {
    return res.status(500).send({ ok: false, message: "Erreur serveur" });
  }
});

module.exports = router;