import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Notes from './pages/Notes';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
