const wrapAsync = require("../utils/wrapAsync.js");
const Question=require("../models/question.model.js")

const askQuestion = wrapAsync(async (req, res) => {
  try {
    console.log("q req", req);
    const { description } = req.body;
    const author = req.user._id;
    if (author === undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!description) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const question = await Question.create({
      description,
      author,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not ask question", error: error.message });
  }
});

const getQuestion = wrapAsync(async (req, res) => {
  try {
    const questions = await Question.find({}).populate("author");
    res.status(201).json(questions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not get questions", error: error.message });
  }
});

const deleteQuestion = wrapAsync(async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const deletedQuestion = await Request.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not delete question", error: error.message });
  }
});

module.exports = {
    askQuestion,
    getQuestion,
    deleteQuestion,
};
