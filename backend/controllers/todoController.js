// project/todos/backend/controllers/todoController.js
import Todo from "../models/todoModel.js";

// GET all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err.message });
  }
};

// ADD new todo
export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await Todo.create({ title: title.trim() });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err.message });
  }
};

// UPDATE todo (toggle completed or update title)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};

    // Accept partial updates (title and/or completed)
    if (req.body.title !== undefined) update.title = String(req.body.title).trim();
    if (req.body.completed !== undefined) update.completed = Boolean(req.body.completed);

    const updated = await Todo.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Todo not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err.message });
  }
};

// DELETE todo by id
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Todo.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err.message });
  }
};
