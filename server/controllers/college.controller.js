const wrapAsync = require("../utils/wrapAsync.js");
const College = require("../models/college.model.js");

const addCollege = wrapAsync(async (req, res) => {
  try {
    const { collegeName } = req.body;
    const college = await College.create({ collegeName });
    if (!college) {
      return res.status(400).json({ message: "College not created" });
    }
    res.status(201).json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create college" });
  }
});

const getColleges = wrapAsync(async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get colleges" });
  }
});

const getNotesByCollege = wrapAsync(async (req, res) => {
  try {
    const { collegeId } = req.params;
    const college = await College.find({ _id: collegeId });
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    const college_ = await college[0].populate("notes");
    res.status(200).json(college_.notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get notes by college" });
  }
});

module.exports = {
  addCollege,
  getColleges,
  getNotesByCollege,
};
