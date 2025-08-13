const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const Category = require("./models/Category");
const Post = require("./models/Post");

const { createAdminUser } = require("./services/adminService");
const seedDatabase = require("./seed");

const envConfig = require("./config/envConfig");
const { mongoUri, admin, port, clientUrl } = envConfig;

const app = express();
app.use(morgan("dev"));
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

    console.log("Mongoose connection success");

    // Check if initial data exists
    const categoryCount = await Category.countDocuments();
    const postCount = await Post.countDocuments();

    if (categoryCount === 0 && postCount === 0) {
      console.log("Executing seed...");
      await seedDatabase();
    } else {
      console.log("Initial data already exists, seed not executed.");
    }

    console.log(`Server listening at port ${port}`);
  } catch (error) {
    console.error("Error to start server:", error);
  }
});
