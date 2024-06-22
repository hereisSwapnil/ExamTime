const wrapAsync = require("../utils/wrapAsync.js");
const Subject = require("../models/subject.model.js");

const addSubject = wrapAsync(async (req, res) => {
  try {
    const { subjectName } = req.body;
    const subject = await Subject.create({ subjectName });
    if (!subject) {
      return res.status(400).json({ message: "Subject not created" });
    }
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create subject" });
  }
});

const getSubjects = wrapAsync(async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get subjects" });
  }
});

const getMatchingSubjects = wrapAsync(async (req, res) => {
  try {
    const { subjectName } = req.query;
    if (!subjectName) {
      return res.status(400).json({ message: "Subject name query parameter is required" });
    }
    // Use a case-insensitive regex to match subjects starting with the provided string
    const subjects = await Subject.find({ subjectName: { $regex: `^${subjectName}`, $options: 'i' } });
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get subjects" });
  }
});

const getNotesBySubject = wrapAsync(async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.find({ _id: subjectId });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const subject_ = await subject[0].populate("notes");
    res.status(200).json(subject_.notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get notes by subject" });
  }
});

module.exports = { addSubject, getSubjects, getMatchingSubjects, getNotesBySubject };
