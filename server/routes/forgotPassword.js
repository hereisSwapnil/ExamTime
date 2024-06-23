const router = require("express").Router();
const User = require("./models/user.routes");

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    //Checks if user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateResetToken(); // Implement your token generation logic

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset link sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send password reset link" });
  }
});

module.exports = router;
