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

export default function App() {
  //SEARCH BAR DATA
  const [query, setQuery] = useState('');
  //LIST OF MOVIES THAT ARE A RESULT OF THE SEARCH
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  //SHOWS WHILE API IS LOADING
  const [isLoading, setIsLoading] = useState(false);
  //SETS AN ERROR MESSAGE IF API DOES NOT FETCH INFO
  const [error, setError] = useState('');
  //HANDLES USER INPUT IN SEARCH BAR
  const [selectedId, setSelectedId] = useState(null);
  const [rating, setRating] = useState();
  function onQueryChange(e) {
    setQuery(e.target.value);
  }
  function handleSelectMovie(id) {
    setSelectedId((prevState) => (prevState === id ? null : id));
  }
  function onResetSelectedId() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((prevState) => [...prevState, movie]);
  }
  //MAKE API CALL AND UPDATE MOVIES ARRAY
  useEffect(() => {
    async function callAPI() {
      try {
        setIsLoading(true);
        if (query.length > 2) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=da90156c&s=${query}`
          );
          if (!res.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await res.json();
          if (
            data.Response === 'True' &&
            data.Search &&
            data.Search.length > 0
          ) {
            setMovies(data.Search);
            setError('');
          } else {
            setMovies([]);
            setError('Movie not found!');
          }
        } else {
          setMovies([]);
          setError('');
        }
      } catch (error) {
        setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    callAPI();
  }, [query]);
  console.log(watched);
  return (
    <>
      <Navbar>
        {/* passed with children props */}
        <Logo />
        <Search onQueryChange={onQueryChange} query={query} />
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
              <WatchedList watched={watched} />
            </>
          ) : (
            <SelectedMovie
              id={selectedId}
              onResetSelectedId={onResetSelectedId}
              onAddWatched={handleAddWatched}
              rating={rating}
              setRating={setRating}
            />
          )}
        </Box>
      </Main>
      <Footer />
    </>
  );
}
