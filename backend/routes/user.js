const express = require("express");
const router = express.Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const User = require("../db/userSchema");
const Account = require("../db/bank").default;
const createToken = require("../middlewares/jwtAut");
const authMiddleware = require("../middlewares/authToken");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const userSchema = z.object({
    username: z.string().email(),
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    password: z.string().regex(passwordRegex,"Password must be at least 8 characters, include uppercase, lowercase, and a number")
})

const userSignInSchema = z.object({
    username: z.string().email(),
    password: z.string().regex(passwordRegex, "Password must be at least 8 characters, include uppercase, lowercase, and a number")
});

router.post("/signUp", async (req, res) => {
    const userData = req.body;

    try {
        const parseData = userSchema.parse(userData);

        if (!parseData) {
            return res.status(400).json({ error: "Invalid user data" });
        }
        
        const { username, firstname, lastname } = parseData;
        const passwordHash = await bcrypt.hash(parseData.password, 10);

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({
            username,
            firstName: firstname,
            lastName: lastname,
            password: passwordHash
        });

        await newUser.save()
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.floor(Math.random() * 10000)
        })
        
        const token = createToken(newUser._id);

        res.status(201).json({ 
            message: "User created successfully",
            token: token,
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
              
router.post('/signIn', async (req, res) => {
    const userData = req.body;

    try {
        const parseData = userSignInSchema.parse(userData);

        if (!parseData) {
            return res.status(400).json({ error: "Invalid user data" });
        }

        const { username, password } = parseData;
        const user = await User.findOne({ username});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = createToken(user._id);

        res.status(200).json({
            message: "User signed in successfully",
            token: token
        });
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

})

router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter;

  try {
    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        { firstName: { "$regex": filter, "$options": "i" } },
        { lastName: { "$regex": filter, "$options": "i" } }
      ]
    });

    res.json({
      user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      }))
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;