import React, { useState, useEffect } from "react";

const Sitebar = ({ search, searchHandler, movieLocationHandler }) => {
  const [menuState, setMenuState] = useState([true, false, false]);

  const menuStateHandler = (state) => {
    setMenuState(
      menuState.map((item, index) =>
        index == state ? (item = true) : (item = false)
      )
    );
    switch (state) {
      case 0:
        movieLocationHandler("abaton");
        break;
      case 1:
        movieLocationHandler("netflix");
        break;
      case 2:
        movieLocationHandler("dammtor");
    }
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
            <a href="#">Login</a>
          </li>
          <li>
            <a href="https://github.com/tinoschroeter/kino" target="_blank" rel="noreferrer">GitHub</a>
          </li>
          <li>
            <a href="#">Notification</a>
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
