// backend/controllers/todoController.js
import Todo from "../models/todoModel.js";

// =========================
// ✅ Get all todos
// =========================
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err.message });
  }
};

// =========================
// ✅ Add a new todo
// =========================
export const addTodo = async (req, res) => {
  try {
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title: req.body.title,
      completed: false,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: "Error creating todo", error: err.message });
  }
};

// =========================
// ✅ Update todo by ID
// =========================
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = req.body.title ?? todo.title;
    todo.completed = req.body.completed ?? todo.completed;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: "Error updating todo", error: err.message });
  }
};

// =========================
// ✅ Delete todo by ID
// =========================
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err.message });
  }
};
