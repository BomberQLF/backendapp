const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MODELNAME = "user";

const Schema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true },
    nickname: {type: String, unique: true, required: true, trim: true },
    password: String,
    confirmPassword: String,
    lastLoginAt: { type: Date, default: Date.now },
},
{ timestamps: true }
)