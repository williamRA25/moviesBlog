require("dotenv/config.js");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("OK");
});
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoose connection succes");
    console.log("listening at port", PORT);
  } catch (error) {
    console.log(error);
  }
});
