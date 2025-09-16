import { useEffect, useState } from "react";
import axios from "axios";
import { Check, Undo, Edit2, Trash2, PlusCircle } from "lucide-react";

const API_URL = "https://todo-81hc.onrender.com/api/todos"; // Fixed URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await axios.post(API_URL, { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const editTodo = async (id, oldTitle) => {
    const newTitle = prompt("Edit Todo:", oldTitle);
    if (!newTitle) return;
    await axios.put(`${API_URL}/${id}`, { title: newTitle });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          🚀 Creative Todo Manager
        </h1>

        {/* Add Todo */}
        <form onSubmit={addTodo} className="flex gap-3 items-center mb-8">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            <PlusCircle size={20} /> Add
          </button>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-8">
          <div className="p-4 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
            Total: {todos.length}
          </div>
          <div className="p-4 rounded-xl bg-yellow-100 text-yellow-700 font-bold">
            Pending: {todos.filter((t) => !t.completed).length}
          </div>
          <div className="p-4 rounded-xl bg-green-100 text-green-700 font-bold">
            Completed: {todos.filter((t) => t.completed).length}
          </div>
        </div>

        {/* Todo Lists */}
        <div className="grid grid-cols-2 gap-6">
          {/* Pending */}
          <div>
            <h2 className="text-xl font-bold text-yellow-600 mb-3">📝 Pending</h2>
            <ul className="space-y-3">
              {todos.filter(t => !t.completed).map(t => (
                <li key={t._id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl shadow-sm border hover:shadow-md transition">
                  <span className="font-medium">{t.title}</span>
                  <div className="flex gap-3">
                    <button onClick={() => toggleTodo(t._id, t.completed)} className="text-green-600 hover:scale-110 transition" title="Mark Completed">
                      <Check size={20} />
                    </button>
                    <button onClick={() => editTodo(t._id, t.title)} className="text-indigo-600 hover:scale-110 transition" title="Edit">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => deleteTodo(t._id)} className="text-red-600 hover:scale-110 transition" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed */}
          <div>
            <h2 className="text-xl font-bold text-green-600 mb-3">✅ Completed</h2>
            <ul className="space-y-3">
              {todos.filter(t => t.completed).map(t => (
                <li key={t._id} className="flex justify-between items-center p-3 bg-green-50 rounded-xl shadow-sm border hover:shadow-md transition">
                  <span className="line-through text-gray-600">{t.title}</span>
                  <div className="flex gap-3">
                    <button onClick={() => toggleTodo(t._id, t.completed)} className="text-yellow-600 hover:scale-110 transition" title="Undo">
                      <Undo size={20} />
                    </button>
                    <button onClick={() => deleteTodo(t._id)} className="text-red-600 hover:scale-110 transition" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
