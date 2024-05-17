const wrapAsync = require("../utils/wrapAsync");

// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
const User = require("../models/user.model");

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

const sendOTP = wrapAsync(async (email) => {
  console.log(email);
  try {
    const otp = generateSixDigitOTP();

    const mailOptions = {
      from: "examtime.official.dev@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    await User.updateOne({ email: email }, { $set: { otp: otp } });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  sendOTP,
};
