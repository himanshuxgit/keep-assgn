// Note.tsx

import React from 'react';
import { Note as NoteType } from '../features/notesSlice'; // Correctly importing the Note type

interface NoteProps {
  note: NoteType;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  // Example implementation of the Note component
  return (
    <div className="note-container">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {/* Add more elements or conditions based on your requirements */}
    </div>
  );
};

export default Note;
