import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWJjZjYzMzJkY2ExODg3YzJkMTM3ZDY4MzY3ZDFiYSIsIm5iZiI6MTc0NDMxMDkxMS4wNDcwMDAyLCJzdWIiOiI2N2Y4MTI3ZmQ0YzQ0NGExY2M5OThjMGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6DZFq9Hn6PdK-xfcLeysZKb1U8Xno3pXzlEn85hcMh4";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = API_TOKEN;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day", {
      params: { language: "en-US" },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching trending movies:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const { data } = await axios.get("/genre/movie/list", {
      params: { language: "en-US" },
    });
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchMoviesByQuery = async (query) => {
  try {
    const { data } = await axios.get("/search/movie", {
      params: { query, language: "en-US", include_adult: false, page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching movies by query:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    return data;
  } catch (error) {
    console.error(" Error fetching movie details:", error);
    return null;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`, {
      params: { language: "en-US" },
    });
    return data.cast;
  } catch (error) {
    console.error(" Error fetching movie cast:", error);
    return [];
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`, {
      params: { language: "en-US", page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching movie reviews:", error);
    return [];
  }
};
