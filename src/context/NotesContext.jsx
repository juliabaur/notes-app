import React, { createContext, useReducer, useContext } from 'react';

export const ACTIONS = {
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
};

const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case ACTIONS.DELETE_NOTE:
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
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