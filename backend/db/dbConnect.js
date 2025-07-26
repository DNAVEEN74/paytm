const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;