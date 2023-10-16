//HOOK IMPORTS
import { useEffect, useState } from 'react';
//COMPONENT IMPORTS
import Navbar from './components/Navbar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Box from './components/Box';
import List from './components/List';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectedMovie from './components/SelectedMovie';
import Footer from './components/Footer';
import { useMovies } from './hooks/useMovies';

export default function App() {
  //SEARCH BAR DATA
  const [query, setQuery] = useState('');
  //LIST OF MOVIES THAT HAVE BEEN ADDED TO WATCHED LIST
  //USES LAZY STATE INITIALIZATION TO GET MOVIES FROM LOCAL STORAGE
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue) || [];
  });
  //HANDLES USER INPUT IN SEARCH BAR
  const [selectedId, setSelectedId] = useState(null);
  //STATE FOR USER RATING FOR STAR COMPONENT
  const [rating, setRating] = useState();
  //HANDLES SEARCH BAR INPUT
  function onQueryChange(e) {
    setQuery(e.target.value);
  }
  //SELECTS THE MOVIE THAT MATCHES THE ID
  function handleSelectMovie(id) {
    setSelectedId((prevState) => (prevState === id ? null : id));
  }
  //RESETS BACK TO NO MOVIE SELECTED
  function onResetSelectedId() {
    setSelectedId(null);
  }
  //ADDS MOVIE TO WATCH ARRAY
  function handleAddWatched(movie) {
    setWatched((prevState) => [...prevState, movie]);
  }
  //DELETES MOVIE FROM WATCHED ARRAY
  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID.imdbID !== id)
    );
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);
  const [movies, isLoading, error] = useMovies(query);
  return (
    <>
      <Navbar>
        {/* passed with children props */}
        <Logo />
        <Search
          onQueryChange={onQueryChange}
          query={query}
          setQuery={setQuery}
        />
        {query.length > 2 && <NumResults movies={movies} />}
      </Navbar>
      <Main>
        <Box>
          {/* passed with children props */}
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <List movies={movies} onSelectId={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {/* passed with children props */}
          {!selectedId ? (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          ) : (
            <SelectedMovie
              id={selectedId}
              onResetSelectedId={onResetSelectedId}
              onAddWatched={handleAddWatched}
              rating={rating}
              setRating={setRating}
              watched={watched}
            />
          )}
        </Box>
      </Main>
      <Footer />
    </>
  );
}
