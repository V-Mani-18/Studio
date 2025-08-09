const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  name: String,
  studio: String,
  username: String,
  password: String,
  mobile: String,
  place: String,
  status: String,
  amount: { type: Number, default: 0 },
  receivedAmount: { type: Number, default: 0 },
  pendingAmount: { type: Number, default: 0 },
  planStart: { type: Date },
  planEnd: { type: Date },
  paymentState: { type: String, enum: ["Paid", "Pending"], default: "Pending" }
  // Add other fields as needed
});

module.exports = mongoose.model("client", clientSchema);