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
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/documents", require("./routes/documents"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/results", require("./routes/results"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/attendances", require("./routes/attendances"));
app.use("/api/result-publications", require("./routes/resultPublications"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/subjects", require("./routes/subjects"));
app.use("/api/admins", require("./routes/admins"));

// API helth check
app.get("/api-health", (req, res) => {
  res.json({ message: "Welcome to College Management System API" });
});

// PORT assigning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
