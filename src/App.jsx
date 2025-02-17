import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote"; 
import EditNote from "./pages/EditNote";
import Navbar from "./components/Navbar";
import React from 'react';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </div>
    </NotesProvider>
  );
}

export default App;
