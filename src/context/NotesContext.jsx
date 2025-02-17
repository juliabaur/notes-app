import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state of note
const initialState = {
    notes: [],
  };
  
  // Actions for reducer
  export const ACTIONS = {  
    ADD_NOTE: 'add_note',
    DELETE_NOTE: 'delete_note',
    UPDATE_NOTE: 'update_note',
  };
  

// Reducer function
const notesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case ACTIONS.DELETE_NOTE:
      return { ...state, notes: state.notes.filter((note) => note.id !== action.payload) };
    case ACTIONS.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    default:
      return state;
  }
};

// Create context
const NotesContext = createContext();

// Context provider component
export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState, (initial) => {
    // Load notes from Localstorage if existing
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      return { notes: JSON.parse(storedNotes) };
    }
    return initial;
  });

  // Store notes in local storage if state is changed
  useEffect(() => {
    if (state.notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }
  }, [state.notes]);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

// Hook to call context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

