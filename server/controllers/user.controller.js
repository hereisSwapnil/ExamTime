import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: "register",
  });
});

const loginUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: "login",
  });
});

const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: "logout",
  });
});

export default { registerUser, loginUser, logoutUser };
