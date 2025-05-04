const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const connectDB = require("./config/db");
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.get("/api-health", (req, res) => {
  res.json({ message: "Welcome to College Management System API" });
});

// PORT assigning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
