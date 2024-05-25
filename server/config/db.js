const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI).then(() => {
      console.log("Mongoose connected");
    });
  } catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
};

module.exports = connectDB;
