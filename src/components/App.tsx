import React from 'react';
import NotesGrid from './NotesGrid';
import NewNoteForm from './NewNoteForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../App.css'; // This is where your global styles would go
import Sidebar from './Sidebar';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <div className='main-content'>
          <div className="form-content">
            <NewNoteForm />
          </div>
          <div className="grid">
            <NotesGrid />
          </div>
        </div>
      </div>
    </Provider >
  );
};

export default App;