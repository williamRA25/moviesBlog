const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

module.exports = mongoose.model("User", userScheme);
