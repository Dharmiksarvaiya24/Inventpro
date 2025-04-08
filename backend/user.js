const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String
});

const newuserSchema = new mongoose.Schema({
    username: String  // ✅ Make sure field name matches frontend
});

// Define Models
const User = mongoose.model("User", userSchema);
const NewUser = mongoose.model("NewUser", newuserSchema);

module.exports = { User, NewUser };  // ✅ Ensure correct export
