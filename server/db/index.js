const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`
    );
    console.log(
      `\nMONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
