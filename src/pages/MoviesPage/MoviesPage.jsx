import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";
import { fetchGenres, fetchMoviesByQuery } from "../../tmdb-api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);

        const movies = await fetchMoviesByQuery(query);
        setMovies(movies);
        const genres = await fetchGenres();
        setGenres(genres);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}
      {movies.length > 0 ? (
        <MovieList movies={movies} genres={genres} />
      ) : (
        query && <p>No results found.</p>
      )}
    </div>
  );
}
