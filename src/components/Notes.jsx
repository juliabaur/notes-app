import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { ACTIONS } from '../context/NotesContext';

const Notes = () => {
  const { state, dispatch } = useNotes();
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    const newNote = { id: Date.now(), content: note };
    dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote });
    setNote('');
  };

  const handleDeleteNote = (id) => {
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: id });
  };

  return (
    <div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Neue Notiz"
      />
      <button onClick={handleAddNote}>Notiz hinzufügen</button>

      <ul>
        {state.notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => handleDeleteNote(note.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
