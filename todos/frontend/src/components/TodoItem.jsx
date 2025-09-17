function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => toggleTodo(todo._id)}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo._id)}>❌</button>
    </div>
  );
}

export default TodoItem;
