const User = require("../models/User");
const Food = require("../models/Food");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers     = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: "provider" });
    const totalNGOs      = await User.countDocuments({ role: "ngo" });
    const totalListings  = await Food.countDocuments();
    const pending        = await Food.countDocuments({ status: "pending" });
    const accepted       = await Food.countDocuments({ status: "accepted" });
    const completed      = await Food.countDocuments({ status: "completed" });
    const recentListings = await Food.find().populate("provider", "name").sort({ createdAt: -1 }).limit(5);
    res.json({ totalUsers, totalProviders, totalNGOs, totalListings, pending, accepted, completed, recentListings });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getDashboardStats, getAllUsers };