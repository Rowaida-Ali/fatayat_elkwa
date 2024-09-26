import React, { useState, useEffect } from 'react';
import './Todolist.css';

function Todolist() {
    const [tasks, setTasks] = useState([]);
    const [taskTitleInput, setTaskTitleInput] = useState('');
    const [taskInput, setTaskInput] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitleInput, setEditTitleInput] = useState('');
    const [editInput, setEditInput] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3003/api/tasks');
            if (!response.ok) {
                console.error(`Failed to fetch tasks. Status: ${response.status}`);
                return; 
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const addTask = async () => {
        if (taskTitleInput.trim() && taskInput.trim()) {
            try {
                const response = await fetch('http://localhost:3003/add_task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: taskTitleInput,
                        text: taskInput
                    }),
                });
                if (!response.ok) {
                    console.error(`Failed to add task. Status: ${response.status}`);
                    return; 
                }
                const newTask = await response.json();
                setTasks(prevTasks => [...prevTasks, newTask]);
                setTaskTitleInput('');
                setTaskInput('');
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        } else {
            alert('Please enter a title and a task.');
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:3003/delete_task/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error(`Failed to delete task. Status: ${response.status}`);
                return; 
            }
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const startEditing = (task) => {
        setEditTaskId(task.id);
        setEditTitleInput(task.title);
        setEditInput(task.text);
    };

    const editTask = async () => {
        if (editTitleInput.trim() && editInput.trim()) {
            try {
                const response = await fetch(`http://localhost:3003/edit_task/${editTaskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: editTitleInput,
                        text: editInput
                    }),
                });
                if (!response.ok) {
                    console.error(`Failed to update task. Status: ${response.status}`);
                    return; 
                }
                const updatedTask = await response.json();
                setTasks(prevTasks => prevTasks.map(task => (task.id === editTaskId ? updatedTask : task)));
                setEditTaskId(null);
                setEditTitleInput('');
                setEditInput('');
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        } else {
            alert('Please enter a title and task to save.');
        }
    };

    return (
        <div className="container">
            <h1>My To-Do List</h1>
            <label>Title</label>
            <input
                type="text"
                value={taskTitleInput}
                onChange={(e) => setTaskTitleInput(e.target.value)}
                placeholder="Add a title..."
            />
            <label>Task</label>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {editTaskId === task.id ? (
                            <div>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={editTitleInput}
                                    onChange={(e) => setEditTitleInput(e.target.value)}
                                    placeholder="Edit title..."
                                />
                                <label>Task</label>
                                <input
                                    type="text"
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                    placeholder="Edit task..."
                                />
                                <button onClick={editTask}>Save</button>
                            </div>
                        ) : (
                            <span>
                                <strong>{task.title}</strong>: {task.text}
                                <button onClick={() => startEditing(task)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;
