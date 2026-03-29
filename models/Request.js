const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  food:        { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status:      { type: String, enum: ["pending", "accepted", "completed"], default: "pending" },
  note:        { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);