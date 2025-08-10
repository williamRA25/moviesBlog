require("dotenv/config.js");

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL,
  jwtSecret: process.env.JWT_SECRET,
  admin: {
    name: process.env.ADMIN_NAME,
    lastname: process.env.ADMIN_LASTNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};
