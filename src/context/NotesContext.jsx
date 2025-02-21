import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import AuthContext for user access

export const ACTIONS = {
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  LOAD_NOTES: 'LOAD_NOTES',
  UPDATE_NOTE: 'UPDATE_NOTE',  // Added for updating a note
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

  // ✅ Load notes when user changes
  useEffect(() => {
    if (user) {
      const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
      const userNotes = allNotes[user.email] || [];
      dispatch({ type: ACTIONS.LOAD_NOTES, payload: userNotes });
    } else {
      dispatch({ type: ACTIONS.LOAD_NOTES, payload: [] });
    }
  }, [user]);

  // ✅ Save note under the logged-in user
  const saveNote = (note) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
    const userNotes = allNotes[user.email] || [];

    const updatedNotes = [...userNotes, note];
    allNotes[user.email] = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(allNotes));

    dispatch({ type: ACTIONS.ADD_NOTE, payload: note });
  };

  // ✅ Delete a specific note
  const deleteNote = (id) => {
    if (!user) return;

    const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
    const userNotes = allNotes[user.email] || [];

    const updatedNotes = userNotes.filter(note => note.id !== id);
    allNotes[user.email] = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(allNotes));

    dispatch({ type: ACTIONS.DELETE_NOTE, payload: id });
  };

  // ✅ Update an existing note
  const updateNote = (updatedNote) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
    const userNotes = allNotes[user.email] || [];

    const updatedNotes = userNotes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    allNotes[user.email] = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(allNotes));

    dispatch({ type: ACTIONS.UPDATE_NOTE, payload: updatedNote });
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
