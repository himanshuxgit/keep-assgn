import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addNote } from '../features/notesSlice';
import { v4 as uuidv4 } from 'uuid';
import { MdColorLens, MdAddPhotoAlternate, MdOutlinePushPin, MdPushPin } from 'react-icons/md';

const NewNoteForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#202124'); // Default note color
  const [image, setImage] = useState<string | null>(null); // State for background image
  const [pinned, setPinned] = useState(false); // State to manage pinned status
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  const autoResizeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    setContent(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() !== '' && content.trim() !== '') {
      dispatch(addNote({
        id: uuidv4(),
        title,
        content,
        pinned,
        color,
        image,
        createdAt: Date.now(),
      }));
    }

    setTitle('');
    setContent('');
    setColor('#202124');
    setImage(null);
    setIsExpanded(false);
    setPinned(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        if (readerEvent.target?.result) {
          setImage(readerEvent.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [formRef]);

  return (
    <div ref={formRef} className={isExpanded ? 'note-form-expanded' : 'note-field-collapsed'} style={{ backgroundColor: color, display: 'flex', flexDirection: 'column', width: '600px', margin: '10px auto', padding: '10px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        {isExpanded ? (
          <>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="input-field"
            />

            <textarea
              placeholder="Take a note..."
              value={content}
              onChange={autoResizeTextarea}
              className="input-field"
              style={{ minHeight: '50px' }} // Inline style for minHeight
            />
            <div style={{ alignSelf: 'start' }}>
              <div>

              <label>
                <MdColorLens className="icon-button" />
                <input
                  type="color"
                  value={color}
                  onChange={handleBackgroundColorChange}
                  style={{ display: 'none' }}
                />
              </label>
              <label>
                <MdAddPhotoAlternate className="icon-button" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                className="close-button"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setPinned(!pinned)}
                className="pin-button"
              >
                {pinned ? <MdOutlinePushPin /> : <MdPushPin />}
              </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', cursor: 'pointer' }} onClick={handleExpand}>
            <span>Take a note...</span>
            <div>
              <MdColorLens className="icon-button" />
              <MdAddPhotoAlternate className="icon-button" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewNoteForm;
