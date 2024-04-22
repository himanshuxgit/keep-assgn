import { MdSearch, MdNotifications, MdEdit, MdArchive, MdDelete } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item"><MdSearch /> <span>Notes</span></div>
      <div className="sidebar-item"><MdNotifications /> <span>Reminders</span></div>
      <div className="sidebar-item"><MdEdit /> <span>Edit labels</span></div>
      <div className="sidebar-item"><MdArchive /> <span>Archive</span></div>
      <div className="sidebar-item"><MdDelete /> <span>Trash</span></div>
    </div>
  );
};

export default Sidebar;
