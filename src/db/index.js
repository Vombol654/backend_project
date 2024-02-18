const mongoose = require("mongoose");
const db_name = require("../constants");

exports.connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URL);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${db_name}`
    );
    console.log(
      `\n MongoDB connected !! DB Host:${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("mongodb connection error", err);
    process.exit(1);
  }
};
// module.exports = connectDB;
