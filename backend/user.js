const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String
});

const newuserSchema = new mongoose.Schema({
    username: String 
});

const User = mongoose.model("User", userSchema);
const NewUser = mongoose.model("NewUser", newuserSchema);

module.exports = { User, NewUser };  
