import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';  // Make sure to import the Footer
import Profile from './pages/Profile';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Home from './pages/Home';
import Notes from './pages/Notes';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />  {/* Footer is added after the Routes */}
    </>
  );
};

export default App;
