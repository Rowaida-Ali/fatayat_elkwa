import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3003/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch('http://localhost:3003/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, task }),
    });
    setTitle('');
    setTask('');
    fetchTasks();
  };
  
  const deleteTask = async () => {
    await fetch(`http://localhost:3003/delete_task`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer $('token'}`,
      },
    });
    fetchTasks();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <input 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Task" 
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" />
            {t.title}: {t.task}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
