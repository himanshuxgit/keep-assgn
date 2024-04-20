import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addNote } from '../features/notesSlice';
import { v4 as uuidv4 } from 'uuid';
import { MdColorLens, MdAddPhotoAlternate, MdOutlinePushPin } from 'react-icons/md';

const NewNoteForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff'); // Default note color
  const [image, setImage] = useState<string | null>(null); // State for background image
  const [pinned, setPinned] = useState(false); // State to manage pinned status
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNote({
      id: uuidv4(),
      title,
      content,
      pinned,
      color,
      image,
    }));
    setTitle('');
    setContent('');
    setColor('#ffffff');
    setImage(null);
    setIsExpanded(false);
    setPinned(false); // Reset pinned status on form submission
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
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent.target?.result && typeof readerEvent.target.result === 'string') {
          setImage(readerEvent.target.result);
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
    <div ref={formRef} className={isExpanded ? 'note-form-expanded' : 'note-field-collapsed'}>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <label htmlFor="color-input">
              <MdColorLens />
              <input
                id="color-input"
                type="color"
                value={color}
                onChange={handleBackgroundColorChange}
                style={{ display: 'none' }}
              />
            </label>
            <label htmlFor="image-input">
              <MdAddPhotoAlternate />
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            <button
              type="button"
              onClick={() => setPinned(!pinned)} // Toggle pin state
              style={{ backgroundColor: pinned ? 'gold' : 'transparent' }} // Visual feedback
            >
              <MdOutlinePushPin />
            </button>
          </>
        )}
        <textarea
          placeholder="Take a note..."
          value={content}
          onFocus={handleExpand}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" style={{ display: isExpanded ? 'block' : 'none' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewNoteForm;