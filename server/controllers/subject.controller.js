import wrapAsync from "../utils/wrapAsync.js";
import Subject from "../models/subject.model.js";

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
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get subjects" });
  }
});

export { addSubject, getSubjects };
