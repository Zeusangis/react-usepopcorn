import { useEffect, useRef } from "react";

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) {
        return;
      }
      if (e.code === "Enter") {
        setQuery("");
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
export function NumResults({ movies }) {
  const numMovies = movies ? movies.length : 0;
  return (
    <p className="num-results">
      Found <strong>{numMovies}</strong> results
    </p>
  );
}
