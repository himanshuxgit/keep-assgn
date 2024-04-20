import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { togglePin, deleteNote } from '../features/notesSlice';
import { MdDelete, MdOutlinePushPin} from 'react-icons/md';
import { LuPinOff } from "react-icons/lu";
import { Note } from '../features/notesSlice'; // Ensure this import path is correct

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const dispatch = useAppDispatch();

  return (
    <>
    
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => dispatch(togglePin(note.id))}>
        {note.pinned ? <LuPinOff /> : <MdOutlinePushPin />}
      </button>
      <button onClick={() => dispatch(deleteNote(note.id))}>
        <MdDelete />
      </button>
    </div>
    <h1>Hello</h1></>
  );
};

export default NoteCard;
