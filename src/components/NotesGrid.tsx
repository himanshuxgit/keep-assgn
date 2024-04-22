import React, { useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import NoteCard from './NoteCard';

const NotesGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const notes = useAppSelector(state => state.notes.notes); // Accessing notes from the Redux store

  return (
    <div className="grid" ref={gridRef}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} backgroundImage={note.image} />
      ))}
    </div>
  );
};

export default NotesGrid;
