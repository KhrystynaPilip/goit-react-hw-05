import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from "./App.module.css";

const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

export default function App() {
  return (
    <div className={css.container}>
      <AppHeader />

      <Suspense
        fallback={
          <p>
            <b>Loading page...</b>
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />{" "}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
