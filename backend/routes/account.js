const express = require("express");
const mongoose = require("mongoose");
const Account = require("../db/bank").default;
const authMiddleware = require("../middlewares/authToken");
const router = express.Router();

router.post('/transferMoney',authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, recipientId } = req.body;
    const userId = req.userid;

    const userAccount = await Account.findOne({
        userId: userId
    }).session(session);

    if (!userAccount || userAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const recipientAccount = await Account.findOne({
        userId: recipientId
    }).session(session);

    if (!recipientAccount) {
        await session.abortTransaction();
        return res.status(404).json({
            message: "Recipient not found"
        });
    }
    await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: recipientId }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Transfer successful" });
});

router.get('/balance',authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const userAccount = await Account.findOne({
            userId: userId
        })
        const balance = userAccount.balance;
        return res.status(200).json({ balance: balance });

    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ error: "Invalid token" });
    }
})

module.exports = router
module.exports = router