const express = require("express");
const app = express();
const routes = require("./routers/routes");

app.use(express.json());

/***Route binding*/
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello from pirate studio Server");
});

module.exports = app;
