import Head from "next/head";
import Image from "next/image";

import Sidebar from "../components/Sidebar.js";
import ProfileBox from "../components/ProfileBox.js";
import TopMenu from "../components/TopMenu.js";
import MovieList from "../components/MovieList.js";

import React, { useState } from "react";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div
      className={
        toggleSidebar ? "window-margin sidebar-is-open" : "window-margin"
      }
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="description" content="Kino Tino" />
      </Head>
      <div className="window">
        <Sidebar search={search} searchHandler={searchHandler} />
        <div className="main" role="main">
          <div className="top-bar">
            {loggedIn && <ProfileBox user="Tino" />}
            <TopMenu
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
          </div>
          <MovieList search={search} />
        </div>
      </div>
    </div>
  );
};

export default Home;
