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

export default function App() {
  //SEARCH BAR DATA
  const [query, setQuery] = useState('');
  //LIST OF MOVIES THAT ARE A RESULT OF THE SEARCH
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  //SHOWS WHILE API IS LOADING
  const [isLoading, setIsLoading] = useState(false);
  //HANDLES USER INPUT IN SEARCH BAR
  function onQueryChange(e) {
    setQuery(e.target.value);
  }
  //MAKE API CALL AND UPDATE MOVIES ARRAY
  useEffect(() => {
    async function callAPI() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=da90156c&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
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
          {isLoading ? <Loader /> : <List movies={movies} />}
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
