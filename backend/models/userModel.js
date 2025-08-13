const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g. "001"
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  place: { type: String, required: true },
  event: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);