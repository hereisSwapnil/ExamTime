const wrapAsync = require("../utils/wrapAsync.js");
const Request = require("../models/request.model.js");

const addRequest = wrapAsync(async (req, res) => {
  try {
    const { description } = req.body;
    const author = req.user._id;
    if (author === undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
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

const deleteRequest = wrapAsync(async (req, res) => {
   try{
     const requestId = req.params.requestId;
     const deletedRequest = await Request.findByIdAndDelete(requestId);
     if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
     }
     res.status(200).json({ message: 'Request deleted successfully'});

   } catch {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not delete request", error: error.message });
   }
});

module.exports = {
  addRequest,
  getRequests,
  deleteRequest
};
