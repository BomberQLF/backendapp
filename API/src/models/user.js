const mongoose = require("mongoose");

const MODELNAME = "user";

const Schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true },
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    password: String,
    last_login_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//...

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;
