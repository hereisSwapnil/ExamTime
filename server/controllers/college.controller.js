import wrapAsync from "../utils/wrapAsync.js";
import College from "../models/college.model.js";

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

export { addCollege, getColleges };
