import React from 'react';
import { Note } from '../features/notesSlice';  // Correct import for the Note type

interface NoteDisplayProps {
  note: Note;
}

const NoteDisplay: React.FC<NoteDisplayProps> = ({ note }) => {
  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {/* Add more details or actions for the note */}
    </div>
  );
};

export default NoteDisplay;
