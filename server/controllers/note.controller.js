import asyncHandler from "../utils/asyncHandler.js";

const getNote = asyncHandler((req, res) => {
  res.status(200).json({
    message: "get Note",
  });
});

const AddNote = asyncHandler((req, res) => {
  res.status(200).json({
    message: "add Note",
  });
});

const UpdateNote = asyncHandler((req, res) => {
  res.status(200).json({
    message: "update Note",
  });
});

const deleteNote = asyncHandler((req, res) => {
  res.status(200).json({
    message: "delete Note",
  });
});

export default { getNote, AddNote, UpdateNote, deleteNote };
