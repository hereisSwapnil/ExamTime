const wrapAsync = require("../utils/wrapAsync");

// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const ResetPassword = require("../models/resetPasswordModel.js");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

function generateSixDigitOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return otp;
}

const sendOTP = wrapAsync(async (email, tosetPassword = false) => {
  try {
    const otp = generateSixDigitOTP();

    // Get user's theme preference
    let userTheme = "light"; // Default to light mode
    try {
      const user = await User.findOne({ email: email });
      if (user && user.settings && user.settings.theme) {
        userTheme = user.settings.theme;
      }
    } catch (error) {
      console.log("Error fetching user theme, using default:", error.message);
    }

    // Logo URLs based on theme
    // Light mode logo
    const lightModeLogo = "https://i.postimg.cc/g0PS7TFz/image.png";
    // Dark mode logo (TextLogo/blackLogo)
    // Replace this URL with your hosted dark mode logo (blackLogo.png)
    // You can upload blackLogo.png to a hosting service like PostImg, Imgur, or your own CDN
    const darkModeLogo =
      process.env.DARK_MODE_LOGO_URL ||
      "https://i.postimg.cc/g0PS7TFz/image.png";

    // Select logo based on theme
    const logoUrl = userTheme === "dark" ? darkModeLogo : lightModeLogo;

    // Background color based on theme
    const backgroundColor = userTheme === "dark" ? "#1f2937" : "#ffffff";
    const textColor = userTheme === "dark" ? "#f9fafb" : "#111827";
    const borderColor = userTheme === "dark" ? "#374151" : "#e5e7eb";
    const linkColor = userTheme === "dark" ? "#60a5fa" : "#00466a";
    const otpBgColor = userTheme === "dark" ? "#3b82f6" : "#00466a";

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Email Verification OTP",
      // text: `Your OTP for email verification is: ${otp}`,
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;background-color:${backgroundColor};color:${textColor};">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid ${borderColor}">
          <a href="https://github.com/hereisswapnil/ExamTime" target="_blank" style="font-size:1.4em;color: ${linkColor};text-decoration:none;font-weight:600"><img width="200px" src="${logoUrl}" alt="ExamTime" /></a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for using <b>ExamTime</b>. Use the following OTP to verify your account. OTP is valid for <b>5 minutes</b></p>
        <h2 style="background: ${otpBgColor};margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />ExamTime</p>
        <hr style="border:none;border-top:1px solid ${borderColor}" />
        <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300; float:right">
          <a href="https://github.com/hereisswapnil/ExamTime" style="text-decoration: none; color:#aaa;" target="_blank">ExamTime</a>
          <p>Made with ❤️</p>
          <a href="https://github.com/hereisswapnil" style="text-decoration: none; color:#aaa;" target="_blank">@hereisSwapnil</a>
        </div>
      </div>
    </div>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email: ", email);
    if (tosetPassword) {
      const resetPassword = await ResetPassword({ email, otp });
      await resetPassword.save();
    } else {
      await User.updateOne({ email: email }, { $set: { otp: otp } });
    }
  } catch (error) {
    console.log("Error sending OTP: ", error.message);
  }
});

module.exports = {
  sendOTP,
};
