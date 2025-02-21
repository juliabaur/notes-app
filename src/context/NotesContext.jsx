import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import AuthContext for user access

export const ACTIONS = {
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  LOAD_NOTES: 'LOAD_NOTES',
  UPDATE_NOTE: 'UPDATE_NOTE',
};

const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_NOTES:
      return { ...state, notes: action.payload };
    case ACTIONS.ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case ACTIONS.DELETE_NOTE:
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    case ACTIONS.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const { user } = useAuth(); // Get the currently logged-in user
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  // Load notes when user logs in or changes
  useEffect(() => {
    if (user) {
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
      dispatch({ type: ACTIONS.LOAD_NOTES, payload: storedNotes[user.email] || [] });
    } else {
      dispatch({ type: ACTIONS.LOAD_NOTES, payload: [] });
    }
  }, [user]);

  // Save notes to localStorage
  const saveToLocalStorage = (notes) => {
    if (!user) return;
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    allNotes[user.email] = notes;
    localStorage.setItem('notes', JSON.stringify(allNotes));
  };

  // Add new note
  const saveNote = (note) => {
    if (!user) throw new Error('No user logged in');

    const newNote = { id: Date.now(), ...note }; // Ensure a unique ID
    const updatedNotes = [...state.notes, newNote];

    saveToLocalStorage(updatedNotes); // Save the updated notes in localStorage
    dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote }); // Dispatch to update state
  };

  // Delete a specific note
  const deleteNote = (id) => {
    if (!user) return;

    const updatedNotes = state.notes.filter(note => note.id !== id);
    saveToLocalStorage(updatedNotes); // Save the updated notes in localStorage
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: id }); // Dispatch to update state
  };

  // Update an existing note
  const updateNote = (updatedNote) => {
    if (!user) throw new Error('No user logged in');
  
    const updatedNotes = state.notes.map(note =>
      note.id === updatedNote.id ? { ...note, ...updatedNote } : note
    );
  
    saveToLocalStorage(updatedNotes); // Save the updated notes in localStorage
    dispatch({ type: ACTIONS.UPDATE_NOTE, payload: updatedNote }); // Dispatch to update state
  };

  return (
    <NotesContext.Provider value={{ notes: state.notes, saveNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
