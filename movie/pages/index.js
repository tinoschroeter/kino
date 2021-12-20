import Head from "next/head";
import Image from "next/image";

import Sidebar from "../components/Sidebar.js";
import ProfileBox from "../components/ProfileBox.js";
import TopMenu from "../components/TopMenu.js";
import FeaturedMovie from "../components/FeaturedMovie.js";
import MovieList from "../components/MovieList.js";

import React, { useState  } from "react";

const Home = () => {
const [toggleSidebar, setToggleSidebar] = useState(false)
const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className={ toggleSidebar ? 'window-margin sidebar-is-open' : 'window-margin' }>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#54baff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="description" content="Kino Tino"/>
    </Head>
      <div className="window">
        <Sidebar />
        <div className="main" role="main">
          <div className="top-bar">
            { loggedIn && <ProfileBox user="Tino" /> }
            <TopMenu toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
          </div>
          <FeaturedMovie />
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default Home;
