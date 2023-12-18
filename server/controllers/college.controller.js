import asyncHandler from "../utils/asyncHandler.js";

const getCollege = asyncHandler((req, res) => {
  res.status(200).json({
    message: "get college",
  });
});

const AddCollege = asyncHandler((req, res) => {
  res.status(200).json({
    message: "add college",
  });
});

const UpdateCollege = asyncHandler((req, res) => {
  res.status(200).json({
    message: "update college",
  });
});

const deleteCollege = asyncHandler((req, res) => {
  res.status(200).json({
    message: "delete college",
  });
});

export default { getCollege, AddCollege, UpdateCollege, deleteCollege };
