require("dotenv/config.js");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoose connection succes");
    console.log("listening at port", PORT);
  } catch (error) {
    console.log(error);
  }
});
