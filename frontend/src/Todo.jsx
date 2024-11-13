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
      await axios.put(`http://localhost:8000/todos/${currentTodoId}`, { text });
      setIsEditing(false);
      setCurrentTodoId(null);
    } else {
      await axios.post('http://localhost:8000/todos', { text });
    }
    setText('');
    const res = await axios.get('http://localhost:8000/todos');
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    const res = await axios.get('http://localhost:8000/todos');
    setTodos(res.data);
  };

  const editTodo = (todo) => {
    setText(todo.text);
    setIsEditing(true);
    setCurrentTodoId(todo._id);
  };

  return (
    <div>
      <h1 className='bg-green-600'>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button className='bg-slate-100' onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
