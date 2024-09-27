import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { ErrorMessage } from "./ErrorMessage";
import { Logo, Search, NumResults } from "./Logo";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovies } from "./WatchedMovies";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("interstellar");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie({ imdbID }) {
    setSelectedId((selectedId) => (imdbID === selectedId ? null : imdbID));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  });
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box movies={movies}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onAddWatched={handleAddWatched}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovies
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
