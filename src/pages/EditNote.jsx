import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

const EditNote = () => {
  const { id } = useParams();
  const { notes, updateNote } = useNotes();
  const navigate = useNavigate();

  // Convert id to number if needed
  const numericId = parseInt(id, 10);

  // Find the note
  const note = notes.find((note) => note.id === numericId);

  // Fix issue where note is initially undefined
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      navigate('/');  // Redirect if note not found
    }
  }, [note, navigate]);

  const handleSave = () => {
    if (note) {
      const updatedNote = { id: numericId, title, content };  // Ensure the full note is passed
      updateNote(updatedNote); // Call to updateNote function here
      navigate('/');  // navigate back to main page after saving
    }
  };
  
  useEffect(() => {
    console.log('Title:', title, 'Content:', content); // Log current title/content
  }, [title, content]);

  return (
    <div>
      <h2>Edit Note</h2>
      {note ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          ></textarea>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      ) : (
        <p>Note not found!</p>
      )}
    </div>
  );
};

export default EditNote;
