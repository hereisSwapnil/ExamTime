// const passport = require("passport");
const { messaging } = require("firebase-admin");
const User = require("../models/user.model.js");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/sendOTP.js");

const checkUsername = wrapAsync(async (req, res) => {
  try {
    let username = req.params.username;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({
        message: "username taken",
      });
    } else {
      return res.status(200).json({
        message: "username available",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "username check failed",
      error: error.message,
    });
  }
});

const createToken = (_id, email, isverified) => {
  return jwt.sign({ _id, email, isverified }, process.env.SECRET, {
    expiresIn: "365d",
  });
};

const registerUser = wrapAsync(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let userPhoto = `https://ui-avatars.com/api/?name=${username}&background=29335C&size=128&color=fff&format=png&length=1`;

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      userPhoto,
    });

    const registeredUser = await newUser.save();
    // await sendOTP(email);
    const token = createToken(registeredUser._id, email, false);
    res
      .status(200)
      .json({ user: registeredUser, token, message: "Check for OTP" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Register failed",
      error: error.message,
    });
  }
});

const sendOTPcon = wrapAsync(async (req, res) => {
  try {
    console.log(req.user);
    const email = req.user.email;
    sendOTP(email);
    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

const verifyOtp = wrapAsync(async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.otp == otp) {
        const updatedUser = await User.findOneAndUpdate(
          { email: user.email },
          { $set: { isverified: true } },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: "User verified successfully",
        });
      } else {
        return res.status(400).json({
          message: "Inavlid Otp ",
          success: false,
        });
      }
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const loginUser = wrapAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found", success: false });
    }
    if (!user.isverified) {
      return res.status(400).json({
        message: "Please verify email first",
        success: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = createToken(user._id);
      // res.cookie("token", token, { secure: true });
      res.status(200).json({
        user,
        token,
        message: "login success",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//logout
//logout
const logoutUser = async (req, res) => {
  try {
    // Clear the token from client-side storage
    res.clearCookie("token");

    // Send a response indicating successful logout
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get a user
const getUser = wrapAsync(async (req, res) => {
  // Retrieve the token from the request headers
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
    if (err) {
      return res.status(404).json({
        message: "Failed to verify token",
        error: err.message,
      });
    }

    try {
      // Assuming you have a User model with findById method
      const user = await User.findById(decoded._id).select("-password");
      console.log(user);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
});

const getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({
        coins: -1,
      })
      .select("-password");
    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  checkUsername,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  verifyOtp,
  getLeaderBoard,
  sendOTPcon,
};
