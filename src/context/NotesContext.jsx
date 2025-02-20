import React, { useReducer, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const NotesContext = React.createContext();

export const ACTIONS = {
  ADD_NOTE: 'add_note',
  DELETE_NOTE: 'delete_note',
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      const updatedNotes = [...state.notes, action.payload];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes };

    case ACTIONS.DELETE_NOTE:
      const filteredNotes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      return { ...state, notes: filteredNotes };

    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  useEffect(() => {
    if (user) {
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const userNotes = storedNotes.filter(note => note.userEmail === user.email);
      dispatch({ type: 'load_notes', payload: userNotes });
    }
  }, [user]);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
