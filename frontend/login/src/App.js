// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage';
import SignupForm from './components/SignupForm/SignupForm';
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
      </Routes>
      </BrowserRouter>
    </div>
  )
};

