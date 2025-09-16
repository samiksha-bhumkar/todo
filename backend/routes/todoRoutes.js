// routes/todoRoutes.js
import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js"; // ✅ include .js extension

const router = express.Router();

// =========================
// ✅ Todo Routes
// =========================

// Get all todos
// GET /todos
router.get("/", getTodos);

// Add a new todo
// POST /todos
router.post("/", addTodo);

// Update a todo by ID
// PUT /todos/:id
router.put("/:id", updateTodo);

// Delete a todo by ID
// DELETE /todos/:id
router.delete("/:id", deleteTodo);

// =========================
// ❌ Invalid route handler (for safety)
// =========================
router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found in /todos" });
});

export default router;
