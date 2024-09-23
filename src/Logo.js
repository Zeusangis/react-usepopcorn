export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
