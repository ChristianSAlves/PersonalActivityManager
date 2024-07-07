import { useState, useEffect } from 'react';
import Todo from './components/Todo.jsx';
import TodoForm from './components/TodoForm.jsx';
import './App.css';
import Search from './components/Search.jsx';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = (text, category, dataEvento) => {
    axios
      .post('http://localhost:3001/todos', { text, category, dataEvento })
      .then((response) => {
        setTodos([...todos, response.data]);
      });
  };

  const removeTodo = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  const completeTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    axios
      .put(`http://localhost:3001/todos/${id}`, { isCompleted: !todo.isCompleted })
      .then((response) => {
        setTodos(
          todos.map((todo) => (todo.id === id ? response.data : todo))
        );
      });
  };

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <div className='todo-list'>
        {todos
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
