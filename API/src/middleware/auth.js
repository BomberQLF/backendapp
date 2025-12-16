const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "votre-clé-secrète";

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).send({ ok: false, message: "Token manquant" });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ ok: false, message: "Token invalide" });
    }
    req.user = user; // Ajoute les données du user au request
    next();
  });
};

module.exports = { authenticateToken };
