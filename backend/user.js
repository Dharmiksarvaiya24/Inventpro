const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String
});

const newUserSchema = new mongoose.Schema({
  username: String,
  points: { type: Number, default: 0 },
  description: { type: String, default: "" }
});

const User = mongoose.model("User", userSchema);
const NewUser = mongoose.model("NewUser", newUserSchema);

module.exports = { User, NewUser };
