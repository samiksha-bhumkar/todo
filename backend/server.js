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
app.use(cors({
  origin: [
     "https://todolist-erd2b7j3k-samiksha-bhumkars-projects.vercel.app/", // Vercel frontend
    "http://localhost:5173"// Vite dev
   
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Routes (prefix all API routes with /api/todos)
app.use("/api/todos", todoRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
