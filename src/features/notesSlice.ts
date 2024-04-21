import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  color: string;
  image: string | null;
  createdAt: number;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      const newNote = {
        ...action.payload,
        createdAt: action.payload.createdAt || Date.now(),
      };
      state.notes.push(newNote);
      state.notes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.createdAt - a.createdAt);
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex(note => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].pinned = !state.notes[index].pinned;
        state.notes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.createdAt - a.createdAt);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  }
});

export const { addNote, togglePin, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
