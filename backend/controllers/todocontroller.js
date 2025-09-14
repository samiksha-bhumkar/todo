const mongoose = require("mongoose");

// Example in-memory Todo model
// You can replace this with a real MongoDB schema if you have one
let todos = [
  { id: 1, title: "Sample Todo", completed: false },
];

// GET /todos
const getTodos = (req, res) => {
  res.json(todos);
};

// POST /todos
const addTodo = (req, res) => {
  const { title } = req.body;
  const newTodo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PUT /todos/:id
const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id == id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
};

// DELETE /todos/:id
const deleteTodo = (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  res.json({ message: "Todo deleted" });
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
