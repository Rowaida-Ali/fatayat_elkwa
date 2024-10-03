import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage';
import SignupForm from './components/SignupForm/SignupForm';
import HomePage from './components/Homepage/homepage';
import ProfilePage from './components/profilepage/Profile';
import StudyAbroad from './components/BlogForm/StudyAbroad';
// import StudyAbroadlist from './components/BlogForm/StudyAbroadlist';
// import EditBlog from './components/BlogForm/EditBlog';
import Todolist from './components/Todolist/Todolist';
// import MyBlogs from './components/BlogForm/MyBlogs';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 
import CreateNote from './components/CreateNote/NoteTaker';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarRoute = ["/login", "/signup"];

  return !hideNavbarRoute.includes(location.pathname) ? <Navbar /> : null;
};

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleUpdate = (updatedBlog) => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  return (
    <div>
      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/aboutpage" element={<ProtectedRoute><Aboutpage /></ProtectedRoute>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> 
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/studyabroad" element={<ProtectedRoute><StudyAbroad blogs={blogs} setBlogs={setBlogs} /></ProtectedRoute>} />
          {/* <Route path="/blog-list" element={<ProtectedRoute><StudyAbroadlist blogs={blogs} onDelete={handleDelete} /></ProtectedRoute>} /> */}
          {/* <Route path="/edit/:id" element={<ProtectedRoute><EditBlog blogs={blogs} onUpdate={handleUpdate} /></ProtectedRoute>} /> */}
          {/* <Route path='/myblogs' element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} /> */}
          <Route path="/todo" element={<ProtectedRoute><Todolist /></ProtectedRoute>} />
          <Route path='/notes' element={<ProtectedRoute><CreateNote></CreateNote></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
