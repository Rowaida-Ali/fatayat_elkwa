import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
    const navigate = useNavigate();


    const handelTodoListclick = () => {
        navigate('/todo')
    }
    const handleStudyAbroadClick = () => {
        navigate('/studyabroad');
    }
    const handleTakingnotesClick = () => {
        navigate('/notes');
    };

    return (
        <div className='home'>
            <h1>Home page</h1>
            <div className='content'>
                <button type='button'onClick={handelTodoListclick}>TO-DO List</button>
                <button type='button' onClick={handleStudyAbroadClick}>Study Abroad</button>
                <button type='button' onClick={handleTakingnotesClick}>Taking Notes</button>
            </div>
        </div>
    );
};

export default HomePage;
