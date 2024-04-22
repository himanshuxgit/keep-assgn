import { MdSearch, MdNotifications, MdEdit, MdArchive, MdDelete } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item"><MdSearch /> Notes</div>
      <div className="sidebar-item"><MdNotifications /> Reminders</div>
      <div className="sidebar-item"><MdEdit /> Edit labels</div>
      <div className="sidebar-item"><MdArchive /> Archive</div>
      <div className="sidebar-item"><MdDelete /> Trash</div>
      
    </div>
  );
};

export default Sidebar;
