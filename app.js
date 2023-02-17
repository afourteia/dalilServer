// Import dependencies or npm packages
const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`).config();
const cookieParser = require(`cookie-parser`);
const multer  = require('multer');
const upload = multer();
const mongoose = require("mongoose");
// var cors = require('cors')

const port = process.env.PORT || 3000;

//Enable All cors requests
// app.use(cors())

// wrapping request body with cookies parser
app.use(cookieParser());
// wrapping request body with json
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
var cors = require('cors');

// for parsing multipart/form-data
app.use(upload.any()); 
app.use(express.static('public'));
app.use(cors());


const Server = async () => {
  try {
    // connecting to the database
    console.log(`connecting to DB...`);
    const connection = await mongoose.connect(process.env.uri);
    // mongoose.set("strictQuery", true);
    console.log(`connected to DB`);
    // connecting to port
    app.listen(port, console.log(`Listening to user request on port ${port}`));
    // importing  routes
    const router = require(`./routes/routes`);
    // using imported routes
    app.use(router);
  } catch (error) {
    console.log(error.message);
  }
};

Server();
