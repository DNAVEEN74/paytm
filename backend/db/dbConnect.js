const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://naveendurgam74:TeluguInfoGuru1234@cluster0.t31gcif.mongodb.net/';

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