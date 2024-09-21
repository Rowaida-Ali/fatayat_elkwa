// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage';
import SignupForm from './components/SignupForm/SignupForm';
import HomePage from './components/Homepage/homepage'
import ProfilePage from './components/profilepage/Profile';
import{BrowserRouter,Routes,Route} from 'react-router-dom';

export default function App(){ 
  return(
    <div>
      
      {/* <LoginForm /> */}
      <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/aboutpage" element={<Aboutpage />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
};

