// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage';
import SignupForm from './components/SignupForm/SignupForm';
import HomePage from './components/Homepage/homepage';
import ProfilePage from './components/profilepage/Profile';
import StudyAbroad from './components/BlogForm/StudyAbroad';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarRoute = ["/login", "/signup"]; 

  return !hideNavbarRoute.includes(location.pathname) ? <Navbar /> : null;
};

export default function App() { 
  return (
    <div>
      <BrowserRouter>  
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/aboutpage" element={<Aboutpage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/studyabroad' element={<StudyAbroad />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
