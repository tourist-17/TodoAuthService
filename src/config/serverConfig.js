const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  JWT_KEY: process.env.JWT_KEY,
  TWILIO_RECOVERY_CODE: process.env.TWILIO_RECOVERY_CODE,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  MY_PHONE_NUMBER: process.env.MY_PHONE_NUMBER,
  TWILIO_URL: process.env.TWILIO_URL,
};
