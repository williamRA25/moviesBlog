const { admin } = require("../config/envConfig");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminUser({ name, lastname, email, password }) {
  if (!name || !lastname || !email || !password) {
    throw new Error(
      "Missing required environment variables to create the admin user. Please make sure ADMIN_NAME, ADMIN_LASTNAME, ADMIN_EMAIL, and ADMIN_PASSWORD are set in your .env file or environment variables."
    );
  }

  const existingAdmin = await User.findOne({ email });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();
  }
}

module.exports = {
  createAdminUser,
};
