import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Sitebar = ({ search, searchHandler, movieLocationHandler }) => {
  const [menuState, setMenuState] = useState([true, false, false, false]);
  const { data: session } = useSession();

  const menuStateHandler = (state) => {
    setMenuState(
      menuState.map((item, index) =>
        index == state ? (item = true) : (item = false)
      )
    );
    switch (state) {
      case 0:
        movieLocationHandler("netflix");
        break;
      case 1:
        movieLocationHandler("amazon");
        break;
      case 2:
        movieLocationHandler("abaton");
        break;
      case 3:
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
            <a>Netflix</a>
          </li>
          <li
            className={menuState[1] ? "active" : ""}
            onClick={() => menuStateHandler(1)}
          >
            <a>Amazon</a>
          </li>
          <li
            className={menuState[2] ? "active" : ""}
            onClick={() => menuStateHandler(2)}
          >
            <a>Abaton</a>
          </li>
          <li
            className={menuState[3] ? "active" : ""}
            onClick={() => menuStateHandler(3)}
          >
            <a>Dammtor</a>
          </li>
        </ul>

        <Separator />

        <ul className="no-bullets">
          <li>
            {!session && <a onClick={() => signIn("auth0")}>Login</a>}
            {session && <a onClick={signOut}>Logout</a>}
          </li>
          {session && (
            <li>
              <a href="#">Preference</a>
            </li>
          )}
          <li>
            <a
              href="https://github.com/tinoschroeter/kino"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
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
