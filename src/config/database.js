const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // console.log("serverConfig.mongouri", serverConfig.mongouri);
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connnected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
