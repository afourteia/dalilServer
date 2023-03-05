const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("serverConfig.mongouri", serverConfig.mongouri);
    await mongoose.connect(process.env.mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
