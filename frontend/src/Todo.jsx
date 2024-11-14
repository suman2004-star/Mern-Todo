import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    // Fetch all todos
    const fetchTodos = async () => {
      const res = await axios.get('http://localhost:8000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`https://mern-todo-wheat.vercel.app/todos/${currentTodoId}`, { text });
      setIsEditing(false);
      setCurrentTodoId(null);
    } else {
      await axios.post('https://mern-todo-wheat.vercel.app/todos', { text });
    }
    setText('');
    const res = await axios.get('https://mern-todo-wheat.vercel.app/todos');
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://mern-todo-wheat.vercel.app/todos/${id}`);
    const res = await axios.get('https://mern-todo-wheat.vercel.app/todos');
    setTodos(res.data);
  };

  const editTodo = (todo) => {
    setText(todo.text);
    setIsEditing(true);
    setCurrentTodoId(todo._id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-96">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-green-600">Todo App</h1>
      </div>

      {/* Todo Form */}
      <form onSubmit={addTodo} className="flex items-center mb-8">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className={`bg-green-500 text-white rounded-r-lg px-4 py-2 transition duration-300 ${
            isEditing ? 'bg-yellow-500' : 'hover:bg-green-600'
          }`}
        >
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Todo List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-gray-100 border rounded-lg px-4 py-3 shadow-sm"
          >
            <span className="flex-grow text-gray-800">{todo.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => editTodo(todo)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Todo;
