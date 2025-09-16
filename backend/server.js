import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js"; // note the .js extension

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS configuration (allow both local dev + deployed frontend)
app.use(cors({
  origin: [
    "http://localhost:5173", // your Vite dev server
    "https://todolist-5zk3j1ft1-samiksha-bhumkars-projects.vercel.app" // your Vercel app
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Routes (choose ONE: /todos OR /api/todos, must match frontend API_URL)
app.use("/api/todos", todoRoutes);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
