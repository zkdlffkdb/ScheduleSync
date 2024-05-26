import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/LoginSignup/loginSignup.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx';
import { MySchedule, MyAccount, Collaborations } from './components/pages/index.js';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        {/*'/' should lead to myschedule instead, loginsignup should be initial page*/}
        <Route path="/" element={<LoginSignup />} /> 
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/my-collaborations" element={<Collaborations />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
