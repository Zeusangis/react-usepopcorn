import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "3f6c6dd9";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong whith fetching movies");
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError("");
    }
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
