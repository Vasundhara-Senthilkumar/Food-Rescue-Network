const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: "" },
  quantity:    { type: String, required: true },
  expiryTime:  { type: Date, required: true },
  location:    { type: String, required: true },
  foodType:    { type: String, enum: ["veg", "non-veg", "both"], default: "veg" },
  status:      { type: String, enum: ["pending", "accepted", "completed"], default: "pending" },
  provider:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  acceptedBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  imageUrl:    { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);