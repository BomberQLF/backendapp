const mongoose = require("mongoose");

const MODELNAME = "task";

const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    list: { type: mongoose.Schema.Types.ObjectId, ref: "list" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;