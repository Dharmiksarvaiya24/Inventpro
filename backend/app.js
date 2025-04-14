const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User, NewUser } = require("./user.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


// ✅ Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create a new user
        const newUser = new User({ email, password, username });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error signing up", error });
    }
});


// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Check if user exists by email and username
        const user = await User.findOne({ email, username });
        if (!user) {
            return res.status(400).json({ message: "User not found or incorrect username" });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
});


// ✅ Fetch All Users (For Dashboard)
app.get("/users", async (req, res) => {
    try {
        const users = await NewUser.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Add New User
app.post("/newuser", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const userEntry = new NewUser({ username });
        await userEntry.save();

        res.json({ message: "User added successfully!", user: userEntry });
    } catch (error) {
        console.error("Error in /newuser:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/deleteuser', async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const deletedUser = await NewUser.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3000, () => console.log("Server running on port 3000"));
