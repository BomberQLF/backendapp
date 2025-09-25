const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();
const crypto = require('crypto');

// Appel des Modèles
const UserObject = require('../models/user');

const config = require("../config");
const { validatePassword } = require('../utils/ValidatePassword');

const SERVER_ERROR = "SERVER_ERROR";

// Routes de TESTS
router.get("/:id", async (req, res) => {
    try {
        const user = await UserObject.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ ok: false, code: "User not found" });
        } 
        return res.status(200).send({ ok: true, user });
    } catch (error) {
        return res.status(500).send({ message: "Serveur Error" })
    }
});

module.exports = router;