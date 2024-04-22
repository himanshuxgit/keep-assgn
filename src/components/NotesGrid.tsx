//import Masonry from 'masonry-layout';
import React, {useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import NoteCard from './NoteCard';

const NotesGrid = () => {
  const gridRef = useRef(null);
  const notes = useAppSelector(state => state.notes.notes);


  return (
    <div className="grid" ref={gridRef}>
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesGrid;
