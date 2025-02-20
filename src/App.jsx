import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import Notes from './pages/Notes';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Wrap AuthProvider around app */}
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<PrivateRoute><AddNote /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
          <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
