const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register user
router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const foundUser = await User.findOne({
      email,
    });
    if (foundUser) {
      return res.status(400).json({ error: "This email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, lastname, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email: emailBody, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: emailBody });
    if (!foundUser) {
      return res.status(400).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);
    const { id, name, lastname, email } = foundUser;
    res.send({
      jwt: token,
      user: { id: foundUser._id, name, lastname, email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "login failed" });
  }
});

module.exports = router;
