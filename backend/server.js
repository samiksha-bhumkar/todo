// project/todos/backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
// Allow all origins for simplicity during development. For production, replace "*" with your Vercel frontend URL (e.g. "https://todo-frontend.vercel.app")
const allowedOrigin = process.env.FRONTEND_ORIGIN || "*";
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Mount routes
app.use("/api/todos", todoRoutes);

// Basic health route
app.get("/", (req, res) => res.send("Backend is running!"));

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server and connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Please set it in environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
