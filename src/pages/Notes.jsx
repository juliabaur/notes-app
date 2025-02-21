import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';

const Notes = () => {
  const { user } = useAuth(); // Access current user

  if (!user) {
    return <div className="text-center text-red-500 mt-10">You need to sign in to access the notes.</div>;
  }

  // Access notes from context
  const { notes, saveNote, deleteNote, updateNote } = useNotes();
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  // Add new note
  const handleAddNote = () => {
    if (note.trim() === '') return; // Prevent empty notes
    const newNote = { id: Date.now(), content: note };
    saveNote(newNote);
    setNote('');
  };

  // Edit a note
  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditedContent(note.content);
  };

  // Save the edited note
  const handleSave = (id) => {
    if (editedContent.trim() === '') return;
    updateNote(id, editedContent);
    setEditingId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
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
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <li key={note.id} className="flex justify-between items-center border-b py-2">
              {editingId === note.id ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="border p-2 w-full rounded-md"
                  />
                  <button onClick={() => handleSave(note.id)} className="bg-green-500 text-white px-3 py-1 rounded-md">
                    Save
                  </button>
                  <button onClick={handleCancel} className="bg-gray-400 text-white px-3 py-1 rounded-md">
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{note.content}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notes;
