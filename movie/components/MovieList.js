import Image from "next/image";
import Link from "next/link";
import YoutubeEmbed from "./YoutubeEmbed";
import Loader from "react-loader-spinner";

import React, { useState, useEffect } from "react";

const myLoader = ({ src, width, quality }) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`;
};

const MovieList = ({ search, movieLocation }) => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [ratingPicker, setRatingPicker] = useState(true);
  const [datePicker, setDatePicker] = useState(true);
  const [filterMovie, setFilterMovie] = useState();
  const [noData, setNoData] = useState(true);

  const ratingHandler = (e) => {
    e.preventDefault();
    setRatingPicker(!ratingPicker);

    let sortRating;
    if (ratingPicker) {
      sortRating = movieList.sort((a, b) => +a.vote_average - +b.vote_average);
    } else {
      sortRating = movieList.sort((a, b) => +b.vote_average - +a.vote_average);
    }
    setFilterMovie(sortRating);
  };

  const movieLocationHandler = (value) => {
    setMovieLocation(value);
  };

  const dateHandler = (e) => {
    e.preventDefault();
    setDatePicker(!datePicker);

    let sortDate;
    if (datePicker) {
      sortDate = movieList.sort((a, b) => +a.added - +b.added);
    } else {
      sortDate = movieList.sort((a, b) => +b.added - +a.added);
    }
    setFilterMovie(sortDate);
  };

  useEffect(() => {
    fetch("/api/movie")
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilterMovie(
      movieList.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, movieList]);

  return (
    <div className="movie-list">
      <TitleBar
        movieLocation={movieLocation}
        ratingHandler={ratingHandler}
        setRatingPicker={setRatingPicker}
        dateHandler={dateHandler}
        datePicker={datePicker}
      />

      {loading && (
        <div>
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}

      {error && <Error />}

      <ul className="list">
        {filterMovie &&
          filterMovie.map(
            (item) =>
              item.location === movieLocation && (
                <MovieItem key={item.title} item={item} />
              )
          )}
      </ul>
    </div>
  );
};

const MovieItem = ({ item }) => {
  const [player, setPlayer] = useState(false);

  return (
    <li key={item.title || "no title"} onClick={() => setPlayer(!player)}>
      <Image
        loader={myLoader}
        src={item.poster_path || "/a0BvlND2RlKgr4TejgPQZ4Q044I.jpg"}
        alt={item.title}
        className="cover"
        width="200"
        height="300"
      />
      <p className="title">
        {item.title || "no title"} / {item.vote_average}
      </p>
      <Star number={item.vote_average} />
      {player && <YoutubeEmbed embedId={item.video} />}
    </li>
  );
};

const Error = (error) => {
  return <>{error}</>;
};

const LoadMore = ({ timeHandler }) => {
  return (
    <a href="#" className="load-more" onClick={timeHandler}>
      Show older movies <span className="fa fa-plus"></span>
    </a>
  );
};

const Star = ({ number }) => {
  const stars = Math.floor(+number / 2);
  const halfStars = stars === +number ? 0 : 1;
  const noStars = 4 - stars;

  return (
    <div className="right">
      <div className="stars">
        {[...Array(stars)].map((x, i) => (
          <span className="fa fa-star" key={i}></span>
        ))}
        {[...Array(halfStars)].map((x, i) => (
          <span className="fa fa-star-half-o" key={i}></span>
        ))}
        {[...Array(noStars)].map((x, i) => (
          <span className="fa fa-star-o" key={i}></span>
        ))}
      </div>
    </div>
  );
};

const TitleBar = ({
  movieLocation,
  ratingHandler,
  ratingPicker,
  dateHandler,
  datePicker,
}) => {
  return (
    <div className="title-bar">
      <div className="left">
        <p className="bold">Empfehlung</p>
        <p className="grey">{movieLocation}</p>
      </div>

      <div className="right">
        <a href="#" onClick={dateHandler}>
          date{" "}
          <i className={datePicker ? "fa fa-angle-down" : "fa fa-angle-up"}></i>
        </a>
        <a href="#" className="blue" onClick={ratingHandler}>
          Rating{" "}
          <i
            className={ratingPicker ? "fa fa-angle-down" : "fa fa-angle-up"}
          ></i>
        </a>
      </div>
    </div>
  );
};

export default MovieList;
