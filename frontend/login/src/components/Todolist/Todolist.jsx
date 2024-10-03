import React, { useState, useEffect } from 'react';
import './Todolist.css';

function Todolist() {
    const [tasks, setTasks] = useState([]);
    const [taskTitleInput, setTaskTitleInput] = useState('');
    const [taskInput, setTaskInput] = useState('');
    const [editTaskTitle, setEditTaskTitle] = useState(null);
    const [editInput, setEditInput] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3003/view_tasks',{
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,}
            }); 
            if (!response.ok) {
              
                return;
            }
            const data = await response.json();
            const allTasks= data.map(innerArray => {
                if (innerArray.length >= 2) {
                    return {
                        title: innerArray[0],
                        text: innerArray[1],
                    };
                }
                return null; 
            }).filter(Boolean); 
         setTasks(allTasks);
            console.log(tasks)
            console.log(allTasks)
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const addTask = async () => {
        if (taskTitleInput.trim() && taskInput.trim()) {
            try {
                const token = localStorage.getItem('token');
  
                const response = await fetch('http://localhost:3003/add_task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`,
                },

                    body : JSON.stringify({
                        title: taskTitleInput,
                        text: taskInput
                    }),
                });        
                if (!response.ok) {
                    console.error(`Failed to add task: HTTP error! Status: ${response.status}`);
                    return;
                }
                const newTask = await response.json();
                fetchTasks();
                // setTasks(prevTasks => [...prevTasks, newTask]);
                setTaskTitleInput('');
                setTaskInput('');
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        } else {
            alert('Please enter a title and a task.');
        }
    };

    const deleteTask = async (title) => {
        try {
             const token = localStorage.getItem('token');
             console.log(title)
            await fetch(`http://localhost:3003/remove_task`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${token}`,
                },
    
                body: JSON.stringify({ title })
                
            });
            // setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const startEditing = (task) => {
        setEditTaskTitle(task.title); // Set title for the task being edited
        setEditInput(task.text);
    };

    const editTask = async () => {
        if (editInput.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3003/edit_task', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' ,
                               'Authorization': `Bearer ${token}`,
            
                    },
                    body: JSON.stringify({
                        title: editTaskTitle, // Use title for the task being edited
                        text: editInput
                    }),
                });
                
                if (!response.ok) {
                    console.error("Failed to update task:");
                    return;
                }
                const updatedTask = await response.json();
                setTasks(prevTasks => prevTasks.map(task => 
                    task.title === editTaskTitle ? { ...task, text: updatedTask.text } : task
                ));
                setEditTaskTitle(''); // Clear the title used for editing
                setEditInput('');
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        } else {
            alert('Please enter a task to save.');
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
                        {editTaskTitle=== task.title ? (
                            <div>
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
                                <button onClick={() => deleteTask(task.title)}>Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;
