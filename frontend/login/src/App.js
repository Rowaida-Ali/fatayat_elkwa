import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage.jsx';
import SignupForm from './components/SignupForm/SignupForm';
import HomePage from './components/Homepage/homepage.jsx';
import ProfilePage from './components/profilepage/Profile';
import StudyAbroad from './components/BlogForm/StudyAbroad';
import StudyAbroadlist from './components/BlogForm/StudyAbroadlist';
import EditBlog from './components/BlogForm/EditBlog';
import Todolist from './components/Todolist/Todolist';
import MyBlogs from './components/BlogForm/MyBlogs';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 
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
          <Route path="/aboutpage" element={<ProtectedRoute protect={<Aboutpage />} />} />
          <Route path="/signup" element={<ProtectedRoute protect={<SignupForm />} />} />
          <Route path="/" element={<ProtectedRoute protect={<HomePage />} />} />
          <Route path="/home" element={<ProtectedRoute protect={<HomePage />} />} /> 
          <Route path="/profile" element={<ProtectedRoute protect={<ProfilePage />} />} />
          <Route path="/studyabroad" element={<ProtectedRoute protect={<StudyAbroad blogs={blogs} setBlogs={setBlogs} />} />} />
          <Route path="/blog-list" element={<ProtectedRoute protect={<StudyAbroadlist blogs={blogs} onDelete={handleDelete} />} />} />
          <Route path="/edit/:id" element={<ProtectedRoute protect={<EditBlog blogs={blogs} onUpdate={handleUpdate} />} />} />
          <Route path='/myblogs' element={<ProtectedRoute protect={<MyBlogs blogs={blogs} onDelete={handleDelete} onUpdate={handleUpdate} />} />} />
          <Route path="/todo" element={<ProtectedRoute protect={<Todolist />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
