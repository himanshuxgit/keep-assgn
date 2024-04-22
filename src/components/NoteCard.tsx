import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { togglePin, deleteNote } from '../features/notesSlice';
import { MdDelete, MdOutlinePushPin,MdPushPin } from 'react-icons/md';
import { Note } from '../features/notesSlice'; // Ensure this import path is correct

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const dispatch = useAppDispatch();

  // Function to convert line breaks in note content to <br/> elements
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    const displayedLines = lines.slice(0, 10); // Take only the first six lines
    const hasMore = lines.length > 10; // Check if there are more than six lines
  
    return (
      <>
        {displayedLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}<br />
          </React.Fragment>
        ))}
        {hasMore && <span>...</span>} 
      </>
    );
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{formatContent(note.content)}</p>
      
      <button 
        onClick={() => dispatch(togglePin(note.id))}
        className="pin-button"
      >
        {note.pinned ? <MdOutlinePushPin /> : <MdPushPin />}
      </button>

      <button 
        onClick={() => dispatch(deleteNote(note.id))}
        className="delete-button"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default NoteCard;
