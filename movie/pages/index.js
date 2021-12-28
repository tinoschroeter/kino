import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Sidebar from "../components/Sidebar.js";
import ProfileBox from "../components/ProfileBox.js";
import TopMenu from "../components/TopMenu.js";
import MovieList from "../components/MovieList.js";

import React, { useState } from "react";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [movieLocation, setMovieLocation] = useState("netflix");
  const { data: session } = useSession()

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const movieLocationHandler = (value) => {
    setMovieLocation(value);
    setToggleSidebar(false);
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
        <Sidebar
          search={search}
          searchHandler={searchHandler}
          movieLocationHandler={movieLocationHandler}
        />

        <div className="main" role="main">
          <div className="top-bar">
            {session && <ProfileBox session={session} />}
            <TopMenu
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
          </div>

          <MovieList
            search={search}
            movieLocation={movieLocation}
            setToggleSidebar={setToggleSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
