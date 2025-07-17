const express = require("express");
const User = require("../db/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authToken");

router.put('/:action',authMiddleware, async (req, res) => {
    const { action } = req.params;

    try {

        if (action === 'changePassword') {
            const { username, oldPassword, newPassword } = req.body;

            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid old password" });
            }

            const passwordHash = await bcrypt.hash(newPassword, 10);

            await User.updateOne(
                { username: username },
                { password: passwordHash }
            )

            return res.status(200).json({ message: "Password updated successfully" });

        } else if (action === 'updateUsername') {
            const { username, newUserName, password } = req.body;

            const user = await User.findOne({username: username});
            if(!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            await User.updateOne(
                { username: username },
                { username: newUserName }
            );

            await user.save();
            return res.status(200).json({ message: "Username updated successfully" });
        } else {
            return res.status(400).json({ error: "Invalid action" });
        }

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    
})

module.exports = router;