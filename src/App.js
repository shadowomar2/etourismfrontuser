import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from './loading-animation.json';
import backgroundlottie from './background-animation.json';
import { fetchData } from './axios_URL';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Tours from './Components/Tours/Tours';
import Book_tour from './Components/Tours/Book_tour';
import Events from './Components/Events/events';
import Book_event from './Components/Events/Book_event';
import HandR from './Components/Hotels&restaurants/HandR';
import About from './Components/Aboutus/About';
import Contactus from './Components/Aboutus/Contactus';

import Footer from './Components/Footer/Footer';
import Signup from './Components/Auth/signup';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
import User_page from './Components/User/User_page'
import './style/common.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [animationOptions, setAnimationOptions] = useState({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('GET', '/check-auth', { Authorization: `Bearer ${token}` })
        .then(response => {
          setIsAuthenticated(true);
        })
        .catch(error => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          // Set isLoading to false after 0.5 seconds
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Lottie options={animationOptions} height={400} width={400} />;
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
   
      <Router>
        <Navbar  isAuthenticated={isAuthenticated} />
        <main style={{ marginBottom: '50px', background: 'rgba(246, 249, 252, 0)', minHeight: 'calc(100vh - 50px)' }}>
        <Lottie style={{ position: 'fixed',  zIndex: -1 ,top: 139.3, right: -150, width: '90%', height: '90%',   pointerEvents: 'none' }} options={{ loop: true, autoplay: true, animationData: backgroundlottie }} />
   
        {isAuthenticated ? (
          <Routes>
            <Route exact path="/" element={<Homepage isAuthenticated={isAuthenticated} />} />
            <Route exact path="/home" element={<Homepage isAuthenticated={isAuthenticated} />} />
            <Route exact path="/tours" element={<Tours />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/hotels" element={<HandR />} />
 
            <Route exact path="/Book_tour/:id" element={<Book_tour />} />
            <Route exact path="/Book_event/:id" element={<Book_event />} />
              <Route exact path="/user" element={<User_page />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact_us" element={<Contactus />} />
              <Route exact path="/logout" element={<Logout onLogout={() => setIsAuthenticated(false)} />} />
              <Route path="*" element={<Homepage isAuthenticated={isAuthenticated} />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Homepage isAuthenticated={isAuthenticated} />} />
            <Route exact path="/home" element={<Homepage isAuthenticated={isAuthenticated} />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/about" element={<About />} /> 
                <Route exact path="/contact_us" element={<Contactus />} />
                <Route exact path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                <Route path="*" element=  {<Login onLogin={() => setIsAuthenticated(true)} />} />
          </Routes>
        )}
      </main>
      <Footer style={{ position: 'relative', zIndex: 10}} />
      </Router>
       </div>
  );
}

export default App;