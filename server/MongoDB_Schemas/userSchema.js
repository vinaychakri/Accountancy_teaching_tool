const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

//MongoDB schema for users
const users = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    require: true,
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
});
users.plugin(timestamp);
const userSchema = mongoose.model("users", users);
module.exports = userSchema;
