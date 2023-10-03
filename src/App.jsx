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

export default function App() {
  //SEARCH BAR DATA
  const [query, setQuery] = useState('');
  //LIST OF MOVIES THAT ARE A RESULT OF THE SEARCH
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  //SHOWS WHILE API IS LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  //HANDLES USER INPUT IN SEARCH BAR
  function onQueryChange(e) {
    setQuery(e.target.value);
  }
  //MAKE API CALL AND UPDATE MOVIES ARRAY
  useEffect(() => {
    async function callAPI() {
      try {
        setIsLoading(true);
        if (query) {
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
  return (
    <>
      <Navbar>
        {/* passed with children props */}
        <Logo />
        <Search onQueryChange={onQueryChange} query={query} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* passed with children props */}
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <List movies={movies} />
          )}
        </Box>
        <Box>
          {/* passed with children props */}
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
