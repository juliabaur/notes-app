import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';  

const EditNote = () => {
  const { id } = useParams();  // Fetch ID from URL
  const { state, dispatch } = useNotes();
  const note = state.notes.find((note) => note.id === id);  // Find to be modified note

  const [title, setTitle] = useState(note ? note.title : '');  // Default: Note title
  const [content, setContent] = useState(note ? note.content : '');  

  const navigate = useNavigate();

  // Function for saving modified note
  const handleSave = () => {
    dispatch({
      type: 'update_note',
      payload: { id, title, content },
    });
    navigate('/');  // navigate back to main page after saving
  };

  useEffect(() => {
    if (!note) {
      navigate('/');  // If no note exists, back to home page
    }
  }, [note, navigate]);

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
