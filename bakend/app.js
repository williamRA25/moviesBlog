require("dotenv/config.js");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("OK");
});
app.listen(PORT, () => {
  console.log("listening at port", PORT);
});
