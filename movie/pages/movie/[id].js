import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const VideoCard = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movie")
      .then((response) => response.json())
      .then((data) => {
        const findMovie = data.filter((item) => item.id === parseInt(id));
        setMovie(findMovie[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h1>{movie && movie.title}</h1>
      <p>{movie && movie.overview}</p>
    </div>
  );
};

export default VideoCard;
