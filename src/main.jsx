import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext'; // Import NotesProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  </React.StrictMode>
);
