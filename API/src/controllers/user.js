const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "votre-clé-secrète";

// Route d'inscription
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).send({ ok: false, message: "Champs manquants" });
  }
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
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ ok: false, message: "Champs manquants" });
  }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ ok: false, message: "Email ou mot de passe incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ ok: false, message: "Email ou mot de passe incorrect" });
    }
    const token = jwt.sign({ _id: user._id }, SECRET);
    return res.status(200).send({ ok: true, token, user: { email: user.email, username: user.username } });
});

module.exports = router;