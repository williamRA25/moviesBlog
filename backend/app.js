const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const User = require("./models/User");
const { createAdminUser } = require("./services/adminService");
const envConfig = require("./config/envConfig");

const { mongoUri, admin, port, clientUrl } = envConfig;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: clientUrl,
  })
);

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
    await createAdminUser(admin);
    console.log("mongoose connection success");
    console.log("listening at port", port);
  } catch (error) {
    console.log(error);
  }
});
