import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import './viewBlogs.css';

const viewBlogs =()=>{
    return(
        <div className='scroll'>
            <h1>View Blogs</h1>
            <InfiniteScroll>
                
            </InfiniteScroll>
        </div>

    );
};
export default viewBlogs