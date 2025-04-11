import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import { IMAGE_BASE_URL } from "../../tmdb-api";

export default function MovieList({ movies, genres }) {
  const location = useLocation();

  const getGenreNames = (ids) => {
    return ids
      ?.map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <Link
            to={`/movies/${movie.id}`}
            className={css.link}
            state={{ from: location }}
          >
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
              }
              alt={movie.title}
              className={css.poster}
            />
            <div className={css.info}>
              <h3 className={css.title}>{movie.title}</h3>
              <p className={css.text}>
                Year: {movie.release_date?.slice(0, 4)}
              </p>
              <p className={css.text}>
                Genre: {getGenreNames(movie.genre_ids)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// <ul className={css.list}>
//   {movies.map((movie) => (
//     <li key={movie.id} className={css.listItem}>
//       <h3 className={css.moviename}>{movie.title}</h3>
//       <p className={css.text}>{movie.year}</p>
//       <p className={css.text}>{movie.genre}</p>

//       <Link
//         to={`/movies/${movie.id} `}
//         className={css.link}
//         state={location}
//       ></Link>
//     </li>
//   ))}
// </ul>
