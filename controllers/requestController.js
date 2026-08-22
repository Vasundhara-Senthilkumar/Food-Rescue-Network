const Request = require("../models/Request");
const Food = require("../models/Food");

const createRequest = async (req, res) => {
  const { food, note } = req.body;
  try {
    const foodItem = await Food.findById(food);
    if (!foodItem) return res.status(404).json({ message: "Not found" });
    if (foodItem.status !== "pending") return res.status(400).json({ message: "Food not available" });
    const existing = await Request.findOne({ food, requestedBy: req.user._id, status: "pending" });
    if (existing) return res.status(400).json({ message: "Request already pending" });
    const request = await Request.create({
      food,
      requestedBy: req.user._id,
      note: note || "",
    });
    const populated = await Request.findById(request._id)
      .populate("food")
      .populate("requestedBy", "name email phone");
    res.status(201).json(populated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requestedBy: req.user._id })
      .populate("food")
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getRequestsForFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: "Not found" });
    if (food.provider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    const requests = await Request.find({ food: req.params.foodId })
      .populate("requestedBy", "name email phone address")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    const food = await Food.findById(request.food);
    if (!food) return res.status(404).json({ message: "Not found" });

    if (status === "accepted" || status === "rejected") {
      if (food.provider.toString() !== req.user._id.toString())
        return res.status(403).json({ message: "Not authorized" });
      if (request.status !== "pending")
        return res.status(400).json({ message: "Request already processed" });
    }

    if (status === "accepted") {
      if (food.status !== "pending") return res.status(400).json({ message: "Food already accepted" });
      request.status = "accepted";
      food.status = "accepted";
      food.acceptedBy = request.requestedBy;
      await food.save();
      await request.save();
      return res.json({ message: "Accepted!", request, food });
    }

    if (status === "rejected") {
      request.status = "rejected";
      await request.save();
      return res.json({ message: "Rejected", request });
    }

    if (status === "completed") {
      if (request.status !== "accepted") return res.status(400).json({ message: "Request not accepted yet" });
      if (food.status !== "accepted") return res.status(400).json({ message: "Food not accepted yet" });
      const isProvider = food.provider.toString() === req.user._id.toString();
      const isRequester = request.requestedBy.toString() === req.user._id.toString();
      if (!isProvider && !isRequester) return res.status(403).json({ message: "Not authorized" });
      request.status = "completed";
      food.status = "completed";
      await food.save();
      await request.save();
      return res.json({ message: "Completed!", request, food });
    }

    return res.status(400).json({ message: "Invalid status" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createRequest, getMyRequests, getRequestsForFood, updateRequestStatus };
