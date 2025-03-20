const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./user"); 
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));



app.post("/signup", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User({ email, password, username });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
