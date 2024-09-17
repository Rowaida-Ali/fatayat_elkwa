import React from 'react'
import './homepage.css';
const HomePage = ()=> {
    return(
        <div className='home'>
           <h1>Home page</h1> 
           <div className='content'>
            <button type=''>TO-DO List</button>
            <button type=''>Study Abroad</button>
            <button type=''>Taking Notes</button>
           </div>
        </div>
    );
};

export default HomePage;