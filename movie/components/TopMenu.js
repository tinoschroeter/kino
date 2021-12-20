const TopMenu = ({ toggleSidebar, setToggleSidebar }) => {
  return (
    <ul className="top-menu">
      <li
        className="menu-icon trigger-sidebar-toggle"
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </li>
    </ul>
  );
};

export default TopMenu;
