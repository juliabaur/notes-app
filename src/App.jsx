import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Notes from "./pages/Notes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Header /> {/* Ensure Header is rendered above Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;