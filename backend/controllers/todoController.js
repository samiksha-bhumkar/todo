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
    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error adding todo", error: err.message });
  }
};

// UPDATE todo by id
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err.message });
  }
};

// DELETE todo by id
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err.message });
  }
};
