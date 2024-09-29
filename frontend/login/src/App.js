// import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Aboutpage from './components/Aboutpage/aboutpage';
import SignupForm from './components/SignupForm/SignupForm';
import HomePage from './components/Homepage/homepage';
import StudingAbroad from './components/StudingAbroad/StudigAbroad';
import CreateNote from './components/CreateNote/NoteTaker';
import ViewTakingNotes from './components/viewTakingNotes/ViewNotesPrivate';
import ViewTakingNotes from './components/viewTakingNotes/viewTakingNotes';
import{BrowserRouter,Routes,Route} from 'react-router-dom';

export default function App(){ 
  return(
    <div>
      <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/aboutpage" element={<Aboutpage />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/view_notes' element={<ViewTakingNotes />}/>
        <Route path='/createnote' element={<CreateNote />}/>
        <Route path="/studingabroad" element={<StudingAbroad />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
};

