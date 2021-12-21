import React, { useState, useEffect } from "react";

const Sitebar = ({ search, searchHandler }) => {
  const [menuState, setMenuState] = useState([true, false, false]);

  const menuStateHandler = (state) => {
    setMenuState(
      menuState.map((item, index) =>
        index == state ? (item = true) : (item = false)
      )
    );
  };

  return (
    <aside className="sidebar">
      <div className="top-bar">
        <p className="logo">Menu</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={searchHandler}
        />
        <p className="fa fa-search"></p>
      </div>

      <menu className="menu">
        <p className="menu-name">Movie list</p>
        <ul>
          <li
            className={menuState[0] ? "active" : ""}
            onClick={() => menuStateHandler(0)}
          >
            <a>Abaton</a>
          </li>
          <li
            className={menuState[1] ? "active" : ""}
            onClick={() => menuStateHandler(1)}
          >
            <a>Netflix</a>
          </li>
          <li
            className={menuState[2] ? "active" : ""}
            onClick={() => menuStateHandler(2)}
          >
            <a>Dammtor</a>
          </li>
        </ul>

        <Separator />

        <ul className="no-bullets">
          <li>
            <a href="#">Top 10</a>
          </li>
          <li>
            <a href="#">Login</a>
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
