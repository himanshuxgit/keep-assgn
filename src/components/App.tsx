import React from 'react';
import NotesGrid from './NotesGrid';
import NewNoteForm from './NewNoteForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../App.css'; // This is where your global styles would go

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>My Notes App</h1>
        </header>
        <main>
          <NewNoteForm />
          <NotesGrid />
        </main>
      </div>
    </Provider>
  );
};

export default App;