const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async (req, res) => {
  const { name, password, role, phone, address } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  try {
    const exists = await User.findOne({ email }) ||
      await User.findOne({ email: { $regex: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } });
    if (exists) return res.status(400).json({ message: "Email already exists" });
    const user = await User.create({ name, email, password, role, phone, address });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const { password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.findOne({ email: { $regex: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } });
    }
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid email or password" });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMe = async (req, res) => res.json(req.user);

module.exports = { registerUser, loginUser, getMe };