const Food = require("../models/Food");

const addFood = async (req, res) => {
  const { title, description, quantity, expiryTime, location, foodType, imageUrl } = req.body;
  try {
    const food = await Food.create({
      title, description, quantity, expiryTime, location, foodType, imageUrl,
      provider: req.user._id
    });
    res.status(201).json(food);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("provider", "name email phone address")
      .populate("acceptedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getMyFood = async (req, res) => {
  try {
    const foods = await Food.find({ provider: req.user._id })
      .populate("provider", "name email")   // ✅ added
      .populate("acceptedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const acceptFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Not found" });
    if (food.status !== "pending") return res.status(400).json({ message: "Already accepted" });
    food.status = "accepted";
    food.acceptedBy = req.user._id;
    await food.save();
    res.json({ message: "Accepted!", food });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const completeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Not found" });
    if (food.status !== "accepted") return res.status(400).json({ message: "Not accepted yet" });
    food.status = "completed";
    await food.save();
    res.json({ message: "Completed!", food });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Not found' });
    if (food.provider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await food.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { addFood, getAllFood, getMyFood, acceptFood, completeFood, deleteFood };