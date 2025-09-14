const express = require("express");
const router = express.Router();

// Make sure the filename matches exactly: todoController.js
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController"); // <-- check capitalization

// Routes
router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
