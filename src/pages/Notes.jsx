import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { ACTIONS } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';

const Notes = () => {
  const { user } = useAuth(); // Access current user

  // Redirect if user is not logged in
  if (!user) {
    return <div className="text-center text-red-500 mt-10">You need to sign in to access the notes.</div>;
  }

  // Access notes from context
  const { state, dispatch } = useNotes();
  const [note, setNote] = useState('');

  // Add new note
  const handleAddNote = () => {
    if (note.trim() === '') return; // Prevent empty notes
    const newNote = { id: Date.now(), content: note };
    dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote });
    setNote('');
  };

  // Delete Note
  const handleDeleteNote = (id) => {
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: id });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Notes</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Neue Notiz"
          className="border p-2 w-full rounded-md"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Note
        </button>
      </div>

      <ul className="mt-4">
        {state.notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet.</p>
        ) : (
          state.notes.map((note) => (
            <li key={note.id} className="flex justify-between items-center border-b py-2">
              <span>{note.content}</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notes;