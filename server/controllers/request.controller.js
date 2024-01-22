const wrapAsync = require("../utils/wrapAsync.js");
const Request = require("../models/request.model.js");

const addRequest = wrapAsync(async (req, res) => {
  try {
    const { description } = req.body;
    const author = req.user.id;
    if (!description) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const request = await Request.create({
      description,
      author,
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not add request", error: error.message });
  }
});

const getRequests = wrapAsync(async (req, res) => {
  try {
    const requests = await Request.find({}).populate("author");
    res.status(201).json(requests);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not get requests", error: error.message });
  }
});

module.exports = {
  addRequest,
  getRequests,
};
