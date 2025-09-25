const mongoose = require("mongoose");

const MODELNAME = "list";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;