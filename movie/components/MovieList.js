import Image from "next/image";
import Link from "next/link";
import YoutubeEmbed from "./YoutubeEmbed";

import React, { useState, useEffect } from "react";

const myLoader = ({ src, width, quality }) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`;
};

const MovieList = ({ search }) => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(1000);
  const [rating, setRating] = useState(true);
  const [filterMovie, setFilterMovie] = useState();

  const ratingHandler = (e) => {
    e.preventDefault();
    setRating(!rating);

    let sorting;
    if (rating) {
      sorting = movieList.sort((a, b) => +a.vote_average - +b.vote_average);
    } else {
      sorting = movieList.sort((a, b) => +b.vote_average - +a.vote_average);
    }
    setMovieList(sorting);
  };

  const timeHandler = (e) => {
    e.preventDefault();
    if(time < 10000000000) setTime(time * 10)
  }

  useEffect(() => {
    fetch(`/api/movie/${time}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data)
        setFilterMovie(data)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [time]);


  useEffect(() => {
     setFilterMovie(movieList.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())))
  },[search, movieList])

  return (
    <div className="movie-list">
      <TitleBar
        ratingHandler={ratingHandler}
        rating={rating}
        setRating={setRating}
      />

      { loading && <Loading /> }
      { error && <Error /> }

      <ul className="list">
        { filterMovie && filterMovie.map((item) => (<MovieItem key={item.title} item={item} />)) }
      </ul>
      <LoadMore timeHandler={timeHandler} />
    </div>
  );
};

const MovieItem = ({ item }) => {

  const [player, setPlayer] = useState(false)

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
    { player && <YoutubeEmbed embedId={item.video} /> }
    </li>
  );
};

const Loading = () => {
  return <>Loading...</>;
};

const Error = (error) => {
    return <>{error}</>;
}

const LoadMore = ({ timeHandler }) => {
  return (
    <a href="#" className="load-more" onClick={timeHandler} >
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

const TitleBar = ({ ratingHandler, rating, setRating }) => {
  return (
    <div className="title-bar">
      <div className="left">
        <p className="bold">Aktuell im</p>
        <p className="grey">Abaton</p>
      </div>

      <div className="right">
        <a href="#" className="blue" onClick={ratingHandler}>
          Rating{" "}
          <i className={rating ? "fa fa-angle-down" : "fa fa-angle-up"}></i>
        </a>
      </div>
    </div>
  );
};

export default MovieList;
