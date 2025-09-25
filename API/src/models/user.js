const mongoose = require("mongoose");

const MODELNAME = "user";

const Schema = new mongoose.Schema(
  {
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
  },
  { timestamps: true }
);

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;