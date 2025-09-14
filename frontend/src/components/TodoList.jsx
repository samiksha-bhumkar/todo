import TodoItem from "./TodoItem";

function TodoList({ title, todos, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-list">
      <h2>{title}</h2>
      {todos.length === 0 ? (
        <p>No todos</p>
      ) : (
        todos.map((t) => (
          <TodoItem
            key={t._id}
            todo={t}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
