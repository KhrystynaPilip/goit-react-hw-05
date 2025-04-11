import { useEffect, useState } from "react";
import { fetchGenres, fetchTrendingMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
    fetchGenres().then(setGenres);
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} genres={genres} />
    </div>
  );
}
