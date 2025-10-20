require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")

const app = express();

//Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Connect DB
connectDB()

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Home page")
})

//Start Server
const PORT = process.env.PORT || 4600;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
