import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/LoginSignup/Login.jsx';
import Signup from './components/LoginSignup/Signup.jsx'
import { Navbar } from './components/Navbar/Navbar.jsx';
import { MySchedule, MyAccount, Collaborations, Error } from './components/pages/index.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        {/*Need to make navbar disappear/change when not logged in*/}
        <Route path="/" element={isAuthenticated ? <MySchedule /> : <Login onLogin={handleLogin}/>} /> 
        <Route path="/sign-up" element={<Signup />} />
        {/* Protect routes that require authentication */}
        <Route path="/my-schedule" element={isAuthenticated ? <MySchedule /> : <Error />} />
        <Route path="/my-collaborations" element={isAuthenticated ? <Collaborations /> : <Error />} />
        <Route path="/my-account" element={isAuthenticated ? <MyAccount onLogout={handleLogout}/> : <Error />} />
      </Routes>
    </div>
  );
}

export default App;
