const Sitebar = () => {
  return (
    <aside className="sidebar">
      <div className="top-bar">
        <p className="logo">Menu</p>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <p className="fa fa-search"></p>
      </div>

      <menu className="menu">
        <p className="menu-name">Movie list</p>
        <ul>
          <li className="active">
            <a href="#">Abaton</a>
          </li>
          <li>
            <a href="#">Netflix</a>
          </li>
          <li>
            <a href="#">Dammtor</a>
          </li>
        </ul>

        <Separator />

        <ul className="no-bullets">
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Top 10</a>
          </li>
        </ul>

        <Separator />
      </menu>
    </aside>
  );
};

const Separator = () => {
  return <div className="separator"></div>;
};

export default Sitebar;
