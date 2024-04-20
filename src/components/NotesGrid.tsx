import { useAppSelector } from '../store/hooks';
import NoteCard from './NoteCard';

const NotesGrid = () => {
  const notes = useAppSelector(state => state.notes.notes);

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesGrid;
