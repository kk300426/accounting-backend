const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* ROUTES (IMPORTANT) */
const authRoute = require("./routes/auth");

console.log("TYPE authRoute:", typeof authRoute); // must be function

app.use("/api/auth", authRoute);

/* Test route */
app.get("/", (req, res) => {
  res.send("API running");
});

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
