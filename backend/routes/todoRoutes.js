import express from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

// Todo routes
router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Invalid route handler
router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found in /api/todos" });
});

export default router;
