const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/dbConnect");
const userRoutes = require("./routes/user");
const accountRoutes = require("./routes/account");
const updateRoutes = require("./routes/update");

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['Content-Disposition'],
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/update", updateRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });