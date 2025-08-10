const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser({ name, lastname, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered. Please log in.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    lastname,
    email,
    password: hashedPassword,
  });

  await user.save();
  return { message: "User registered successfully" };
}

async function loginUser({ email, password }) {
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error("Incorrect email or password. Please try again.");
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect email or password. Please try again.");
  }

  const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);

  return {
    jwt: token,
    user: {
      id: foundUser._id,
      name: foundUser.name,
      lastname: foundUser.lastname,
      email: foundUser.email,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};
